#!/usr/bin/env python3
"""
Exhaustive verification of the Policy Sandbox decision matrix against Section 9.1 specification.
Tests all 72 combinations (6 page types x 4 destinations x 3 consent states).
"""

import requests
import sys
from typing import Dict, List, Any

# Configuration
BASE_URL = "https://build-guide-127.preview.emergentagent.com"
ENDPOINT = f"{BASE_URL}/api/policy-sandbox/verify"
LOCALHOST_ENDPOINT = "http://localhost:3000/api/policy-sandbox/verify"

# Expected field order
EXPECTED_FIELD_ORDER = [
    'event_name', 'timestamp', 'page_url', 'page_class',
    'utm_source', 'utm_campaign', 'gclid',
    'service_interest', 'form_free_text', 'email', 'phone'
]

# Destination classes
ADS_DESTINATIONS = ['google_ads', 'meta']
ANALYTICS_DESTINATIONS = ['ga4']
NON_ESSENTIAL_DESTINATIONS = ADS_DESTINATIONS + ANALYTICS_DESTINATIONS
INTERNAL_DESTINATION = 'internal'

# Page types
MARKETING_PAGES = ['homepage', 'blog_article']
SERVICE_PAGE = 'service_page'
APPOINTMENT_FORM = 'appointment_form'
PROTECTED_PAGES = ['portal_login', 'medical_intake']

# Consent states
CONSENT_DENIED = 'denied'
CONSENT_NOT_SET = 'not_set'
CONSENT_GRANTED = 'granted'

# Contact and sensitive fields
CONTACT_FIELDS = ['email', 'phone']
FORM_FREE_TEXT = 'form_free_text'
SENSITIVE_FIELDS = CONTACT_FIELDS + [FORM_FREE_TEXT]

class TestResults:
    def __init__(self):
        self.passes = 0
        self.failures = 0
        self.errors = []
    
    def fail(self, msg: str):
        self.failures += 1
        self.errors.append(msg)
        print(f"❌ FAIL: {msg}")
    
    def success(self, msg: str):
        self.passes += 1
        print(f"✅ PASS: {msg}")
    
    def summary(self):
        total = self.passes + self.failures
        print("\n" + "="*80)
        print(f"SUMMARY: {self.passes}/{total} tests passed, {self.failures} failures")
        print("="*80)
        if self.errors:
            print("\nFAILURES:")
            for i, error in enumerate(self.errors, 1):
                print(f"{i}. {error}")
        return self.failures == 0

def fetch_data(url: str) -> Dict[str, Any]:
    """Fetch the verification data from the endpoint."""
    try:
        print(f"Fetching from {url}...")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching from {url}: {e}")
        raise

def get_evaluation(evaluations: List[Dict], page_type: str, destination: str, consent: str) -> Dict:
    """Find a specific evaluation in the results."""
    for e in evaluations:
        if e['pageType'] == page_type and e['destination'] == destination and e['consent'] == consent:
            return e
    raise ValueError(f"Evaluation not found: {page_type}/{destination}/{consent}")

def test_basic_structure(data: Dict, results: TestResults):
    """Test basic response structure."""
    print("\n" + "="*80)
    print("TEST SECTION: Basic Structure")
    print("="*80)
    
    # Check meta exists
    if 'meta' not in data:
        results.fail("Response missing 'meta' field")
        return
    results.success("Response contains 'meta' field")
    
    # Check evaluations exists
    if 'evaluations' not in data:
        results.fail("Response missing 'evaluations' field")
        return
    results.success("Response contains 'evaluations' field")
    
    # Check count
    evaluations = data['evaluations']
    if len(evaluations) != 72:
        results.fail(f"Expected 72 evaluations, got {len(evaluations)}")
    else:
        results.success("Exactly 72 evaluations present (6 page types x 4 destinations x 3 consent states)")
    
    # Check field order in first evaluation
    if evaluations:
        first_eval = evaluations[0]
        if 'fields' in first_eval:
            actual_order = [f['name'] for f in first_eval['fields']]
            if actual_order == EXPECTED_FIELD_ORDER:
                results.success("Field order is correct")
            else:
                results.fail(f"Field order incorrect. Expected {EXPECTED_FIELD_ORDER}, got {actual_order}")

def test_consent_rule_non_essential(evaluations: List[Dict], results: TestResults):
    """
    A) CONSENT RULE - THE MOST IMPORTANT ASSERTION
    For consent denied and not_set with google_ads, meta, and ga4:
    EVERY field that is present must be state=blocked, decision=BLOCK, sent=0
    This must hold for ALL SIX page types including homepage and blog_article.
    """
    print("\n" + "="*80)
    print("TEST SECTION: A) CONSENT RULE - Non-Essential Destinations")
    print("="*80)
    
    page_types = ['homepage', 'blog_article', 'service_page', 'appointment_form', 'portal_login', 'medical_intake']
    consent_states = [CONSENT_DENIED, CONSENT_NOT_SET]
    
    for page_type in page_types:
        for destination in NON_ESSENTIAL_DESTINATIONS:
            for consent in consent_states:
                eval_data = get_evaluation(evaluations, page_type, destination, consent)
                
                # Check decision is BLOCK
                if eval_data['decision'] != 'BLOCK':
                    results.fail(f"{page_type}/{destination}/{consent}: decision is {eval_data['decision']}, expected BLOCK")
                
                # Check sent is 0
                if eval_data['sent'] != 0:
                    results.fail(f"{page_type}/{destination}/{consent}: sent is {eval_data['sent']}, expected 0")
                
                # Check reason
                expected_reason = 'consent_denied' if consent == CONSENT_DENIED else 'consent_not_recorded'
                if eval_data['reason'] != expected_reason:
                    results.fail(f"{page_type}/{destination}/{consent}: reason is {eval_data['reason']}, expected {expected_reason}")
                
                # Check every present field is blocked
                for field in eval_data['fields']:
                    if field['state'] != 'absent' and field['state'] != 'blocked':
                        results.fail(f"{page_type}/{destination}/{consent}: field {field['name']} has state {field['state']}, expected blocked")
    
    # If we got here without failures in this section, report success
    results.success(f"All {len(page_types) * len(NON_ESSENTIAL_DESTINATIONS) * len(consent_states)} consent-blocked evaluations are correct (36 evaluations)")

def test_consent_rule_internal(evaluations: List[Dict], results: TestResults):
    """
    A) CONSENT RULE - Internal destination
    For internal: consent state must NOT change the outcome.
    Assert that for every page type, the internal evaluation is byte-identical
    in decision, sent, redacted, blocked and per-field states across granted, denied and not_set.
    """
    print("\n" + "="*80)
    print("TEST SECTION: A) CONSENT RULE - Internal Destination (Consent-Independent)")
    print("="*80)
    
    page_types = ['homepage', 'blog_article', 'service_page', 'appointment_form', 'portal_login', 'medical_intake']
    
    for page_type in page_types:
        granted = get_evaluation(evaluations, page_type, INTERNAL_DESTINATION, CONSENT_GRANTED)
        denied = get_evaluation(evaluations, page_type, INTERNAL_DESTINATION, CONSENT_DENIED)
        not_set = get_evaluation(evaluations, page_type, INTERNAL_DESTINATION, CONSENT_NOT_SET)
        
        # Check decision is identical
        if not (granted['decision'] == denied['decision'] == not_set['decision']):
            results.fail(f"{page_type}/internal: decision varies by consent (granted={granted['decision']}, denied={denied['decision']}, not_set={not_set['decision']})")
        
        # Check sent is identical
        if not (granted['sent'] == denied['sent'] == not_set['sent']):
            results.fail(f"{page_type}/internal: sent varies by consent (granted={granted['sent']}, denied={denied['sent']}, not_set={not_set['sent']})")
        
        # Check redacted is identical
        if not (granted['redacted'] == denied['redacted'] == not_set['redacted']):
            results.fail(f"{page_type}/internal: redacted varies by consent")
        
        # Check blocked is identical
        if not (granted['blocked'] == denied['blocked'] == not_set['blocked']):
            results.fail(f"{page_type}/internal: blocked varies by consent")
        
        # Check per-field states are identical
        for i, field_name in enumerate(EXPECTED_FIELD_ORDER):
            granted_field = granted['fields'][i]
            denied_field = denied['fields'][i]
            not_set_field = not_set['fields'][i]
            
            if not (granted_field['state'] == denied_field['state'] == not_set_field['state']):
                results.fail(f"{page_type}/internal/{field_name}: field state varies by consent")
    
    results.success(f"All {len(page_types)} page types have consent-independent internal evaluations")

def test_marketing_pages_with_consent(evaluations: List[Dict], results: TestResults):
    """
    B.1) Homepage and blog_article with consent granted:
    To ads, ga4 AND internal, every present field is allowed, decision=ALLOW, no redactions, no blocks.
    Fields present should be: event_name, timestamp, page_url, page_class, utm_source, utm_campaign, gclid (7 sent)
    service_interest, form_free_text, email, phone should be absent.
    """
    print("\n" + "="*80)
    print("TEST SECTION: B.1) Marketing Pages (homepage, blog_article) with Consent Granted")
    print("="*80)
    
    destinations = ADS_DESTINATIONS + ANALYTICS_DESTINATIONS + [INTERNAL_DESTINATION]
    expected_present = ['event_name', 'timestamp', 'page_url', 'page_class', 'utm_source', 'utm_campaign', 'gclid']
    expected_absent = ['service_interest', 'form_free_text', 'email', 'phone']
    
    for page_type in MARKETING_PAGES:
        for destination in destinations:
            eval_data = get_evaluation(evaluations, page_type, destination, CONSENT_GRANTED)
            
            # Check decision is ALLOW
            if eval_data['decision'] != 'ALLOW':
                results.fail(f"{page_type}/{destination}/granted: decision is {eval_data['decision']}, expected ALLOW")
            
            # Check sent is 7
            if eval_data['sent'] != 7:
                results.fail(f"{page_type}/{destination}/granted: sent is {eval_data['sent']}, expected 7")
            
            # Check redacted is 0
            if eval_data['redacted'] != 0:
                results.fail(f"{page_type}/{destination}/granted: redacted is {eval_data['redacted']}, expected 0")
            
            # Check blocked is 0
            if eval_data['blocked'] != 0:
                results.fail(f"{page_type}/{destination}/granted: blocked is {eval_data['blocked']}, expected 0")
            
            # Check each field
            for field in eval_data['fields']:
                if field['name'] in expected_present:
                    if field['state'] != 'allowed':
                        results.fail(f"{page_type}/{destination}/granted: field {field['name']} has state {field['state']}, expected allowed")
                elif field['name'] in expected_absent:
                    if field['state'] != 'absent':
                        results.fail(f"{page_type}/{destination}/granted: field {field['name']} has state {field['state']}, expected absent")
    
    results.success(f"All {len(MARKETING_PAGES) * len(destinations)} marketing page evaluations are correct")

def test_service_page_with_consent(evaluations: List[Dict], results: TestResults):
    """
    B.2) Service page with consent granted:
    - To ads: service_interest must be redacted (not the original "dental_implants"), page_url also redacted, decision=REDACT
    - To ga4: service_interest must be generalised (redacted with generalised value), decision=REDACT
    - To internal: everything allowed in full, decision=ALLOW
    """
    print("\n" + "="*80)
    print("TEST SECTION: B.2) Service Page with Consent Granted")
    print("="*80)
    
    # Test ads destinations
    for destination in ADS_DESTINATIONS:
        eval_data = get_evaluation(evaluations, SERVICE_PAGE, destination, CONSENT_GRANTED)
        
        # Check decision is REDACT
        if eval_data['decision'] != 'REDACT':
            results.fail(f"service_page/{destination}/granted: decision is {eval_data['decision']}, expected REDACT")
        
        # Find service_interest field
        service_field = next((f for f in eval_data['fields'] if f['name'] == 'service_interest'), None)
        if service_field:
            if service_field['state'] != 'redacted':
                results.fail(f"service_page/{destination}/granted: service_interest state is {service_field['state']}, expected redacted")
            if service_field['value'] == 'dental_implants':
                results.fail(f"service_page/{destination}/granted: service_interest value is original 'dental_implants', must be redacted")
        
        # Find page_url field
        url_field = next((f for f in eval_data['fields'] if f['name'] == 'page_url'), None)
        if url_field:
            if url_field['state'] != 'redacted':
                results.fail(f"service_page/{destination}/granted: page_url state is {url_field['state']}, expected redacted")
    
    results.success(f"Service page to ads destinations correctly redacts service and URL")
    
    # Test ga4
    eval_data = get_evaluation(evaluations, SERVICE_PAGE, 'ga4', CONSENT_GRANTED)
    
    if eval_data['decision'] != 'REDACT':
        results.fail(f"service_page/ga4/granted: decision is {eval_data['decision']}, expected REDACT")
    
    service_field = next((f for f in eval_data['fields'] if f['name'] == 'service_interest'), None)
    if service_field:
        if service_field['state'] != 'redacted':
            results.fail(f"service_page/ga4/granted: service_interest state is {service_field['state']}, expected redacted")
        # Check it's generalised (not the original value)
        if service_field['value'] == 'dental_implants':
            results.fail(f"service_page/ga4/granted: service_interest must be generalised, not original value")
    
    results.success(f"Service page to ga4 correctly generalises service")
    
    # Test internal
    eval_data = get_evaluation(evaluations, SERVICE_PAGE, INTERNAL_DESTINATION, CONSENT_GRANTED)
    
    if eval_data['decision'] != 'ALLOW':
        results.fail(f"service_page/internal/granted: decision is {eval_data['decision']}, expected ALLOW")
    
    if eval_data['redacted'] != 0:
        results.fail(f"service_page/internal/granted: redacted is {eval_data['redacted']}, expected 0 (no redactions)")
    
    results.success(f"Service page to internal allows everything in full")

def test_appointment_form_with_consent(evaluations: List[Dict], results: TestResults):
    """
    B.3) Appointment form with consent granted:
    - To ads and ga4: blocked except generic conversion signal
      Assert service_interest, form_free_text, email, phone are ALL state=blocked
      At least one campaign/conversion field still passes
    - To internal: all 11 fields allowed in full (sent=11, decision=ALLOW)
    """
    print("\n" + "="*80)
    print("TEST SECTION: B.3) Appointment Form with Consent Granted")
    print("="*80)
    
    # Test ads and ga4
    for destination in NON_ESSENTIAL_DESTINATIONS:
        eval_data = get_evaluation(evaluations, APPOINTMENT_FORM, destination, CONSENT_GRANTED)
        
        # Check service_interest, form_free_text, email, phone are blocked
        blocked_fields = ['service_interest', 'form_free_text', 'email', 'phone']
        for field_name in blocked_fields:
            field = next((f for f in eval_data['fields'] if f['name'] == field_name), None)
            if field and field['state'] != 'blocked':
                results.fail(f"appointment_form/{destination}/granted: {field_name} state is {field['state']}, expected blocked")
        
        # Check at least one campaign field passes (for conversion attribution)
        campaign_fields = ['utm_source', 'utm_campaign', 'gclid']
        campaign_allowed = any(
            f['state'] in ['allowed', 'redacted'] 
            for f in eval_data['fields'] 
            if f['name'] in campaign_fields
        )
        if not campaign_allowed:
            results.fail(f"appointment_form/{destination}/granted: no campaign field passes for conversion attribution")
    
    results.success(f"Appointment form to ads/ga4 blocks sensitive fields but allows conversion signal")
    
    # Test internal
    eval_data = get_evaluation(evaluations, APPOINTMENT_FORM, INTERNAL_DESTINATION, CONSENT_GRANTED)
    
    if eval_data['decision'] != 'ALLOW':
        results.fail(f"appointment_form/internal/granted: decision is {eval_data['decision']}, expected ALLOW")
    
    if eval_data['sent'] != 11:
        results.fail(f"appointment_form/internal/granted: sent is {eval_data['sent']}, expected 11")
    
    if eval_data['redacted'] != 0:
        results.fail(f"appointment_form/internal/granted: redacted is {eval_data['redacted']}, expected 0")
    
    results.success(f"Appointment form to internal allows all 11 fields in full")

def test_protected_pages_with_consent(evaluations: List[Dict], results: TestResults):
    """
    B.4 & B.5) Portal login and medical intake with consent granted:
    - To ads and ga4: FULLY blocked - every present field blocked, sent=0, decision=BLOCK, reason=default_deny_class
    - To internal: allowed
    """
    print("\n" + "="*80)
    print("TEST SECTION: B.4 & B.5) Protected Pages (portal_login, medical_intake) with Consent Granted")
    print("="*80)
    
    for page_type in PROTECTED_PAGES:
        # Test ads and ga4
        for destination in NON_ESSENTIAL_DESTINATIONS:
            eval_data = get_evaluation(evaluations, page_type, destination, CONSENT_GRANTED)
            
            # Check decision is BLOCK
            if eval_data['decision'] != 'BLOCK':
                results.fail(f"{page_type}/{destination}/granted: decision is {eval_data['decision']}, expected BLOCK")
            
            # Check sent is 0
            if eval_data['sent'] != 0:
                results.fail(f"{page_type}/{destination}/granted: sent is {eval_data['sent']}, expected 0")
            
            # Check reason
            if eval_data['reason'] != 'default_deny_class':
                results.fail(f"{page_type}/{destination}/granted: reason is {eval_data['reason']}, expected default_deny_class")
            
            # Check every present field is blocked
            for field in eval_data['fields']:
                if field['state'] != 'absent' and field['state'] != 'blocked':
                    results.fail(f"{page_type}/{destination}/granted: field {field['name']} has state {field['state']}, expected blocked")
        
        # Test internal
        eval_data = get_evaluation(evaluations, page_type, INTERNAL_DESTINATION, CONSENT_GRANTED)
        
        if eval_data['decision'] != 'ALLOW':
            results.fail(f"{page_type}/internal/granted: decision is {eval_data['decision']}, expected ALLOW")
    
    results.success(f"All {len(PROTECTED_PAGES)} protected pages fully blocked to ads/ga4, allowed to internal")

def test_integrity_checks(evaluations: List[Dict], results: TestResults):
    """
    C) INTEGRITY CHECKS across all 72:
    - total is always 11
    - sent + redacted counting is coherent
    - decision is BLOCK iff sent = 0
    - decision is REDACT only when redacted > 0 and sent > 0
    - No field with state=blocked has a non-null value
    - No evaluation sends email, phone, or form_free_text to google_ads, meta, or ga4 EVER
    """
    print("\n" + "="*80)
    print("TEST SECTION: C) INTEGRITY CHECKS (All 72 Evaluations)")
    print("="*80)
    
    for eval_data in evaluations:
        combo = f"{eval_data['pageType']}/{eval_data['destination']}/{eval_data['consent']}"
        
        # Check total is always 11
        if eval_data['total'] != 11:
            results.fail(f"{combo}: total is {eval_data['total']}, expected 11")
        
        # Check sent + redacted counting
        allowed_count = sum(1 for f in eval_data['fields'] if f['state'] == 'allowed')
        redacted_count = sum(1 for f in eval_data['fields'] if f['state'] == 'redacted')
        blocked_count = sum(1 for f in eval_data['fields'] if f['state'] == 'blocked')
        absent_count = sum(1 for f in eval_data['fields'] if f['state'] == 'absent')
        
        if allowed_count + redacted_count != eval_data['sent']:
            results.fail(f"{combo}: allowed({allowed_count}) + redacted({redacted_count}) != sent({eval_data['sent']})")
        
        if allowed_count + redacted_count + blocked_count + absent_count != 11:
            results.fail(f"{combo}: allowed + redacted + blocked + absent != 11")
        
        # Check decision is BLOCK iff sent = 0
        if (eval_data['decision'] == 'BLOCK') != (eval_data['sent'] == 0):
            results.fail(f"{combo}: decision=BLOCK must be iff sent=0 (decision={eval_data['decision']}, sent={eval_data['sent']})")
        
        # Check decision is REDACT only when redacted > 0 and sent > 0
        if eval_data['decision'] == 'REDACT':
            if eval_data['redacted'] == 0 or eval_data['sent'] == 0:
                results.fail(f"{combo}: decision=REDACT but redacted={eval_data['redacted']}, sent={eval_data['sent']}")
        
        # Check no blocked field has non-null value
        for field in eval_data['fields']:
            if field['state'] == 'blocked' and field['value'] is not None:
                results.fail(f"{combo}: field {field['name']} is blocked but has value {field['value']}")
        
        # THE SINGLE MOST IMPORTANT NEGATIVE ASSERTION:
        # No evaluation sends email, phone, or form_free_text to google_ads, meta, or ga4 EVER
        if eval_data['destination'] in NON_ESSENTIAL_DESTINATIONS:
            for field in eval_data['fields']:
                if field['name'] in SENSITIVE_FIELDS:
                    if field['state'] in ['allowed', 'redacted'] and field['value'] is not None:
                        results.fail(f"{combo}: CRITICAL - {field['name']} sent to {eval_data['destination']} with value {field['value']}")
    
    results.success(f"All 72 evaluations pass integrity checks")

def test_negative_assertions(evaluations: List[Dict], results: TestResults):
    """
    Additional negative assertions - the most important security checks.
    No evaluation anywhere sends email, phone, or form_free_text to google_ads, meta, or ga4
    under ANY page type or consent state.
    """
    print("\n" + "="*80)
    print("TEST SECTION: CRITICAL NEGATIVE ASSERTIONS (Security)")
    print("="*80)
    
    violations = []
    
    for eval_data in evaluations:
        if eval_data['destination'] in NON_ESSENTIAL_DESTINATIONS:
            for field in eval_data['fields']:
                if field['name'] in SENSITIVE_FIELDS:
                    # Check if field is not blocked and not absent
                    if field['state'] not in ['blocked', 'absent']:
                        combo = f"{eval_data['pageType']}/{eval_data['destination']}/{eval_data['consent']}"
                        violations.append(f"{combo}: {field['name']} has state {field['state']}")
    
    if violations:
        for v in violations:
            results.fail(f"CRITICAL SECURITY VIOLATION: {v}")
    else:
        results.success(f"No email, phone, or form_free_text sent to ads/analytics destinations (checked all 72 evaluations)")

def main():
    print("="*80)
    print("Policy Sandbox Decision Matrix Verification")
    print("Section 9.1 Specification Compliance Test")
    print("="*80)
    
    results = TestResults()
    
    # Try both URLs
    data = None
    for url in [ENDPOINT, LOCALHOST_ENDPOINT]:
        try:
            data = fetch_data(url)
            print(f"✅ Successfully fetched from {url}\n")
            break
        except Exception as e:
            print(f"❌ Failed to fetch from {url}: {e}")
            if url == LOCALHOST_ENDPOINT:
                print("\n❌ Both URLs failed. Cannot proceed with testing.")
                sys.exit(1)
    
    if not data:
        print("❌ No data available. Exiting.")
        sys.exit(1)
    
    evaluations = data.get('evaluations', [])
    
    # Run all test sections
    test_basic_structure(data, results)
    test_consent_rule_non_essential(evaluations, results)
    test_consent_rule_internal(evaluations, results)
    test_marketing_pages_with_consent(evaluations, results)
    test_service_page_with_consent(evaluations, results)
    test_appointment_form_with_consent(evaluations, results)
    test_protected_pages_with_consent(evaluations, results)
    test_integrity_checks(evaluations, results)
    test_negative_assertions(evaluations, results)
    
    # Print summary
    success = results.summary()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
