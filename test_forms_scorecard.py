#!/usr/bin/env python3
"""
Comprehensive testing for Section 11 form submission endpoints and Section 10 scorecard endpoint.
Tests POST /api/forms/[form] and POST /api/scorecard against the specification.
"""

import requests
import sys
import json
import time
from typing import Dict, List, Any, Optional

# Configuration
LOCALHOST_BASE = "http://localhost:3000"
EXTERNAL_BASE = "https://build-guide-127.preview.emergentagent.com"

# Use localhost by default, external for happy path verification
BASE_URL = LOCALHOST_BASE

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


def test_forms_endpoint(results: TestResults):
    """Test POST /api/forms/[form] for both working-session and insights forms."""
    print("\n" + "="*80)
    print("TEST SECTION: POST /api/forms/[form]")
    print("="*80)
    
    # Test 1: Unknown form ID should return 404
    print("\n--- Test 1: Unknown form ID ---")
    try:
        response = requests.post(f"{BASE_URL}/api/forms/unknown-form", json={}, timeout=10)
        if response.status_code == 404:
            data = response.json()
            if data.get('ok') == False:
                results.success("Unknown form ID returns 404 with ok:false")
            else:
                results.fail(f"Unknown form ID returns 404 but ok is {data.get('ok')}")
        else:
            results.fail(f"Unknown form ID returns {response.status_code}, expected 404")
    except Exception as e:
        results.fail(f"Unknown form ID test failed with error: {e}")
    
    # Test 2: Malformed JSON should return 400
    print("\n--- Test 2: Malformed JSON ---")
    try:
        response = requests.post(
            f"{BASE_URL}/api/forms/working-session",
            data="not valid json",
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        if response.status_code == 400:
            results.success("Malformed JSON returns 400")
        else:
            results.fail(f"Malformed JSON returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Malformed JSON test failed with error: {e}")
    
    # Test 3: Honeypot - non-empty organisation_website should return 400
    print("\n--- Test 3: Honeypot (non-empty organisation_website) ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": "http://spam.com"  # Honeypot filled
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if data.get('ok') == False:
                # Must NOT leak that honeypot was the reason
                if 'honeypot' not in data.get('message', '').lower():
                    results.success("Honeypot returns 400 with generic message (no leak)")
                else:
                    results.fail("Honeypot returns 400 but message leaks the reason")
            else:
                results.fail(f"Honeypot returns 400 but ok is {data.get('ok')}")
        else:
            results.fail(f"Honeypot returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Honeypot test failed with error: {e}")
    
    # Test 4: Timing - too fast (< 2000ms) should return 422
    print("\n--- Test 4: Timing - too fast ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 500,  # Only 500ms ago
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 422:
            data = response.json()
            if 'fast' in data.get('message', '').lower() or 'too' in data.get('message', '').lower():
                results.success("Too fast returns 422 with appropriate message")
            else:
                results.fail(f"Too fast returns 422 but message is: {data.get('message')}")
        else:
            results.fail(f"Too fast returns {response.status_code}, expected 422")
    except Exception as e:
        results.fail(f"Too fast test failed with error: {e}")
    
    # Test 5: Timing - missing startedAt should return 422
    print("\n--- Test 5: Timing - missing startedAt ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": True,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 422:
            results.success("Missing startedAt returns 422")
        else:
            results.fail(f"Missing startedAt returns {response.status_code}, expected 422")
    except Exception as e:
        results.fail(f"Missing startedAt test failed with error: {e}")
    
    # Test 6: Timing - expired (> 12 hours) should return 422
    print("\n--- Test 6: Timing - expired ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - (13 * 60 * 60 * 1000),  # 13 hours ago
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 422:
            data = response.json()
            # Accept any message that indicates staleness/expiry
            if 'expir' in data.get('message', '').lower() or 'old' in data.get('message', '').lower() or 'while' in data.get('message', '').lower():
                results.success("Expired returns 422 with appropriate message")
            else:
                results.fail(f"Expired returns 422 but message is: {data.get('message')}")
        else:
            results.fail(f"Expired returns {response.status_code}, expected 422")
    except Exception as e:
        results.fail(f"Expired test failed with error: {e}")
    
    # Test 7: Validation - missing email
    print("\n--- Test 7: Validation - missing email ---")
    try:
        payload = {
            "name": "John Doe",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if data.get('ok') == False and 'errors' in data and 'email' in data['errors']:
                results.success("Missing email returns 400 with errors.email")
            else:
                results.fail(f"Missing email returns 400 but errors structure is: {data}")
        else:
            results.fail(f"Missing email returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Missing email test failed with error: {e}")
    
    # Test 8: Validation - malformed email
    print("\n--- Test 8: Validation - malformed email ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "notanemail",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if data.get('ok') == False and 'errors' in data and 'email' in data['errors']:
                results.success("Malformed email returns 400 with errors.email")
            else:
                results.fail(f"Malformed email returns 400 but errors structure is: {data}")
        else:
            results.fail(f"Malformed email returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Malformed email test failed with error: {e}")
    
    # Test 9: Validation - message too short (< 20 chars)
    print("\n--- Test 9: Validation - message too short ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "Short",  # Only 5 chars
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if data.get('ok') == False and 'errors' in data and 'message' in data['errors']:
                results.success("Short message returns 400 with errors.message")
            else:
                results.fail(f"Short message returns 400 but errors structure is: {data}")
        else:
            results.fail(f"Short message returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Short message test failed with error: {e}")
    
    # Test 10: Validation - consent false
    print("\n--- Test 10: Validation - consent false ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "organisation": "Test Org",
            "role": "Manager",
            "region": "US",
            "message": "This is a test message with more than twenty characters.",
            "consent": False,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if data.get('ok') == False and 'errors' in data and 'consent' in data['errors']:
                results.success("Consent false returns 400 with errors.consent")
            else:
                results.fail(f"Consent false returns 400 but errors structure is: {data}")
        else:
            results.fail(f"Consent false returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Consent false test failed with error: {e}")
    
    # Test 11: Validation - completely empty body
    print("\n--- Test 11: Validation - empty body ---")
    try:
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json={}, timeout=10)
        if response.status_code in [400, 422]:
            data = response.json()
            # Empty body will fail timing check first (startedAt missing/0), so 422 is expected
            # Or it could fail validation with field errors (400)
            if data.get('ok') == False:
                results.success(f"Empty body returns {response.status_code} with ok:false (timing or validation)")
            else:
                results.fail(f"Empty body returns {response.status_code} but ok is {data.get('ok')}")
        else:
            results.fail(f"Empty body returns {response.status_code}, expected 400 or 422")
    except Exception as e:
        results.fail(f"Empty body test failed with error: {e}")
    
    # Test 12: Valid submission for working-session
    print("\n--- Test 12: Valid submission (working-session) ---")
    try:
        payload = {
            "name": "Sarah Mitchell",
            "email": "sarah.mitchell@dentalcare.com",
            "organisation": "Bright Smile Dental Group",
            "role": "Practice Manager",
            "region": "United States",
            "systems": "Dentrix, Weave",
            "message": "We're looking to improve our patient acquisition tracking and would like to understand how Rumiq can help us connect marketing spend to actual patient attendance.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('ok') == True and data.get('delivered') == False:
                results.success("Valid working-session submission returns 200 with ok:true, delivered:false")
            else:
                results.fail(f"Valid submission returns 200 but data is: {data}")
        else:
            results.fail(f"Valid submission returns {response.status_code}, expected 200. Response: {response.text}")
    except Exception as e:
        results.fail(f"Valid submission test failed with error: {e}")
    
    # Test 13: Valid submission for insights
    print("\n--- Test 13: Valid submission (insights) ---")
    try:
        payload = {
            "email": "insights@example.com",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/forms/insights", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('ok') == True and data.get('delivered') == False:
                results.success("Valid insights submission returns 200 with ok:true, delivered:false")
            else:
                results.fail(f"Valid insights submission returns 200 but data is: {data}")
        else:
            results.fail(f"Valid insights submission returns {response.status_code}, expected 200. Response: {response.text}")
    except Exception as e:
        results.fail(f"Valid insights submission test failed with error: {e}")
    
    # Test 14: GET method should not be allowed
    print("\n--- Test 14: GET method not allowed ---")
    try:
        response = requests.get(f"{BASE_URL}/api/forms/working-session", timeout=10)
        if response.status_code in [404, 405]:
            results.success(f"GET method returns {response.status_code} (not allowed)")
        else:
            results.fail(f"GET method returns {response.status_code}, expected 404 or 405")
    except Exception as e:
        results.fail(f"GET method test failed with error: {e}")
    
    # Test 15: PUT method should not be allowed
    print("\n--- Test 15: PUT method not allowed ---")
    try:
        response = requests.put(f"{BASE_URL}/api/forms/working-session", json={}, timeout=10)
        if response.status_code in [404, 405]:
            results.success(f"PUT method returns {response.status_code} (not allowed)")
        else:
            results.fail(f"PUT method returns {response.status_code}, expected 404 or 405")
    except Exception as e:
        results.fail(f"PUT method test failed with error: {e}")
    
    # Test 16: DELETE method should not be allowed
    print("\n--- Test 16: DELETE method not allowed ---")
    try:
        response = requests.delete(f"{BASE_URL}/api/forms/working-session", timeout=10)
        if response.status_code in [404, 405]:
            results.success(f"DELETE method returns {response.status_code} (not allowed)")
        else:
            results.fail(f"DELETE method returns {response.status_code}, expected 404 or 405")
    except Exception as e:
        results.fail(f"DELETE method test failed with error: {e}")


def test_scorecard_endpoint(results: TestResults):
    """Test POST /api/scorecard with comprehensive scoring validation."""
    print("\n" + "="*80)
    print("TEST SECTION: POST /api/scorecard")
    print("="*80)
    
    # Test 1: Honeypot
    print("\n--- Test 1: Honeypot (scorecard) ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": "http://spam.com"
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            results.success("Scorecard honeypot returns 400")
        else:
            results.fail(f"Scorecard honeypot returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Scorecard honeypot test failed with error: {e}")
    
    # Test 2: Timing - too fast
    print("\n--- Test 2: Timing - too fast (scorecard) ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "startedAt": int(time.time() * 1000) - 500,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 422:
            results.success("Scorecard too fast returns 422")
        else:
            results.fail(f"Scorecard too fast returns {response.status_code}, expected 422")
    except Exception as e:
        results.fail(f"Scorecard too fast test failed with error: {e}")
    
    # Test 3: Validation - wrong array length (9 instead of 10)
    print("\n--- Test 3: Validation - answers array length 9 ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0],  # Only 9
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'answers' in data['errors']:
                results.success("Answers array length 9 returns 400 with errors.answers")
            else:
                results.fail(f"Answers array length 9 returns 400 but no errors.answers: {data}")
        else:
            results.fail(f"Answers array length 9 returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Answers array length 9 test failed with error: {e}")
    
    # Test 4: Validation - wrong array length (11 instead of 10)
    print("\n--- Test 4: Validation - answers array length 11 ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  # 11
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'answers' in data['errors']:
                results.success("Answers array length 11 returns 400 with errors.answers")
            else:
                results.fail(f"Answers array length 11 returns 400 but no errors.answers: {data}")
        else:
            results.fail(f"Answers array length 11 returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Answers array length 11 test failed with error: {e}")
    
    # Test 5: Validation - answer value out of range (4)
    print("\n--- Test 5: Validation - answer value 4 (out of range) ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, 0, 0, 4, 0, 0, 0, 0, 0],  # 4 is out of range
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'answers' in data['errors']:
                results.success("Answer value 4 returns 400 with errors.answers")
            else:
                results.fail(f"Answer value 4 returns 400 but no errors.answers: {data}")
        else:
            results.fail(f"Answer value 4 returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Answer value 4 test failed with error: {e}")
    
    # Test 6: Validation - answer value -1
    print("\n--- Test 6: Validation - answer value -1 (out of range) ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, -1, 0, 0, 0, 0, 0, 0, 0],  # -1 is out of range
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'answers' in data['errors']:
                results.success("Answer value -1 returns 400 with errors.answers")
            else:
                results.fail(f"Answer value -1 returns 400 but no errors.answers: {data}")
        else:
            results.fail(f"Answer value -1 returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Answer value -1 test failed with error: {e}")
    
    # Test 7: Validation - missing answers
    print("\n--- Test 7: Validation - missing answers ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'answers' in data['errors']:
                results.success("Missing answers returns 400 with errors.answers")
            else:
                results.fail(f"Missing answers returns 400 but no errors.answers: {data}")
        else:
            results.fail(f"Missing answers returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Missing answers test failed with error: {e}")
    
    # Test 8: Validation - consent false
    print("\n--- Test 8: Validation - consent false (scorecard) ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": False,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'consent' in data['errors']:
                results.success("Consent false returns 400 with errors.consent")
            else:
                results.fail(f"Consent false returns 400 but no errors.consent: {data}")
        else:
            results.fail(f"Consent false returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Consent false test failed with error: {e}")
    
    # Test 9: Validation - bad email
    print("\n--- Test 9: Validation - bad email (scorecard) ---")
    try:
        payload = {
            "email": "notanemail",
            "consent": True,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if 'errors' in data and 'email' in data['errors']:
                results.success("Bad email returns 400 with errors.email")
            else:
                results.fail(f"Bad email returns 400 but no errors.email: {data}")
        else:
            results.fail(f"Bad email returns {response.status_code}, expected 400")
    except Exception as e:
        results.fail(f"Bad email test failed with error: {e}")
    
    # Test 10: GET method should not work
    print("\n--- Test 10: GET method not allowed (scorecard) ---")
    try:
        response = requests.get(f"{BASE_URL}/api/scorecard", timeout=10)
        if response.status_code in [404, 405]:
            results.success(f"GET /api/scorecard returns {response.status_code} (not allowed)")
        else:
            results.fail(f"GET /api/scorecard returns {response.status_code}, expected 404 or 405")
    except Exception as e:
        results.fail(f"GET method test failed with error: {e}")
    
    # Test 11: GET with query string should not work
    print("\n--- Test 11: GET with email in query string should not work ---")
    try:
        response = requests.get(f"{BASE_URL}/api/scorecard?email=test@example.com", timeout=10)
        if response.status_code in [404, 405]:
            results.success(f"GET /api/scorecard?email=... returns {response.status_code} (not allowed)")
        else:
            results.fail(f"GET /api/scorecard?email=... returns {response.status_code}, expected 404 or 405")
    except Exception as e:
        results.fail(f"GET with query string test failed with error: {e}")
    
    # Test 12: Scoring - band boundaries
    print("\n--- Test 12: Scoring - band boundaries ---")
    
    # Expected question IDs in order
    expected_question_ids = ['calls', 'reason', 'attendance', 'capacity', 'attribution', 
                            'consent', 'pages', 'ledger', 'discovery', 'voice']
    
    test_cases = [
        ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0, "severe"),   # Total 0
        ([3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 30, "strong"),  # Total 30
        ([0, 1, 2, 0, 1, 2, 0, 1, 2, 0], 9, "severe"),   # Total 9 (boundary)
        ([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, "partial"), # Total 10 (boundary)
        ([1, 2, 2, 2, 2, 2, 2, 2, 1, 1], 17, "partial"), # Total 17 (boundary)
        ([2, 2, 2, 2, 2, 2, 2, 2, 2, 0], 18, "solid"),   # Total 18 (boundary)
        ([2, 2, 2, 2, 2, 2, 3, 3, 3, 3], 24, "solid"),   # Total 24 (boundary)
        ([3, 3, 3, 3, 3, 2, 2, 2, 2, 2], 25, "strong"),  # Total 25 (boundary)
    ]
    
    for answers, expected_total, expected_band in test_cases:
        try:
            payload = {
                "email": "test@example.com",
                "consent": True,
                "answers": answers,
                "startedAt": int(time.time() * 1000) - 3000,
                "organisation_website": ""
            }
            response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('ok') == True and data.get('delivered') == False:
                    result = data.get('result', {})
                    
                    # Check total
                    if result.get('total') != expected_total:
                        results.fail(f"Answers {answers}: total is {result.get('total')}, expected {expected_total}")
                        continue
                    
                    # Check max
                    if result.get('max') != 30:
                        results.fail(f"Answers {answers}: max is {result.get('max')}, expected 30")
                        continue
                    
                    # Check band
                    band = result.get('band', {})
                    if band.get('id') != expected_band:
                        results.fail(f"Answers {answers}: band.id is {band.get('id')}, expected {expected_band}")
                        continue
                    
                    # Check band has label and body
                    if not band.get('label') or not band.get('body'):
                        results.fail(f"Answers {answers}: band missing label or body")
                        continue
                    
                    # Check weakest array
                    weakest = result.get('weakest', [])
                    if len(weakest) != 5:
                        results.fail(f"Answers {answers}: weakest has {len(weakest)} items, expected 5")
                        continue
                    
                    # Check weakest items have required fields
                    for item in weakest:
                        if 'id' not in item or 'area' not in item or 'score' not in item:
                            results.fail(f"Answers {answers}: weakest item missing required fields: {item}")
                            break
                    
                    # Check email is NOT in response
                    if 'email' in data or 'email' in result:
                        results.fail(f"Answers {answers}: email should not be in response")
                        continue
                    
                    results.success(f"Scoring correct for total={expected_total}, band={expected_band}")
                else:
                    results.fail(f"Answers {answers}: response structure incorrect: {data}")
            else:
                results.fail(f"Answers {answers}: returns {response.status_code}, expected 200")
        except Exception as e:
            results.fail(f"Scoring test for {answers} failed with error: {e}")
    
    # Test 13: Weakest ordering
    print("\n--- Test 13: Weakest ordering (ties broken by question order) ---")
    try:
        # Crafted array: [3,3,3,3,3,0,1,2,0,1]
        # Scores: calls=3, reason=3, attendance=3, capacity=3, attribution=3, 
        #         consent=0, pages=1, ledger=2, discovery=0, voice=1
        # Weakest 5 (ascending): consent=0, discovery=0, pages=1, voice=1, ledger=2
        # With ties broken by order: consent(idx 5), discovery(idx 8), pages(idx 6), voice(idx 9), ledger(idx 7)
        answers = [3, 3, 3, 3, 3, 0, 1, 2, 0, 1]
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": answers,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            result = data.get('result', {})
            weakest = result.get('weakest', [])
            
            # Expected order: consent(0), discovery(0), pages(1), voice(1), ledger(2)
            expected_ids = ['consent', 'discovery', 'pages', 'voice', 'ledger']
            expected_scores = [0, 0, 1, 1, 2]
            
            actual_ids = [item['id'] for item in weakest]
            actual_scores = [item['score'] for item in weakest]
            
            if actual_ids == expected_ids and actual_scores == expected_scores:
                results.success(f"Weakest ordering correct with tie-breaking by question order")
            else:
                results.fail(f"Weakest ordering incorrect. Expected ids={expected_ids}, scores={expected_scores}. Got ids={actual_ids}, scores={actual_scores}")
        else:
            results.fail(f"Weakest ordering test returns {response.status_code}, expected 200")
    except Exception as e:
        results.fail(f"Weakest ordering test failed with error: {e}")
    
    # Test 14: Question IDs match content/scorecard.ts
    print("\n--- Test 14: Question IDs match specification ---")
    try:
        payload = {
            "email": "test@example.com",
            "consent": True,
            "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{BASE_URL}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            result = data.get('result', {})
            weakest = result.get('weakest', [])
            
            # All should have score 0, so all 10 questions are equally weak
            # The first 5 by order should be returned
            actual_ids = [item['id'] for item in weakest]
            expected_first_5 = expected_question_ids[:5]
            
            if actual_ids == expected_first_5:
                results.success(f"Question IDs match specification: {actual_ids}")
            else:
                results.fail(f"Question IDs don't match. Expected {expected_first_5}, got {actual_ids}")
        else:
            results.fail(f"Question IDs test returns {response.status_code}, expected 200")
    except Exception as e:
        results.fail(f"Question IDs test failed with error: {e}")


def test_external_url_happy_path(results: TestResults):
    """Test one happy path case per route using the external URL."""
    print("\n" + "="*80)
    print("TEST SECTION: External URL Happy Path Verification")
    print("="*80)
    
    # Test 1: External URL - working-session form
    print("\n--- Test 1: External URL - working-session form ---")
    try:
        payload = {
            "name": "Dr. Emily Chen",
            "email": "emily.chen@healthgroup.com",
            "organisation": "Metropolitan Health Group",
            "role": "Chief Operating Officer",
            "region": "United States",
            "systems": "Epic, Salesforce",
            "message": "We operate 12 locations across three states and are struggling to connect our marketing investments to actual patient outcomes. Would like to explore how Rumiq can help us measure what matters.",
            "consent": True,
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{EXTERNAL_BASE}/api/forms/working-session", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('ok') == True and data.get('delivered') == False:
                results.success("External URL: working-session form works correctly")
            else:
                results.fail(f"External URL: working-session returns 200 but data is: {data}")
        else:
            results.fail(f"External URL: working-session returns {response.status_code}, expected 200")
    except Exception as e:
        results.fail(f"External URL working-session test failed with error: {e}")
    
    # Test 2: External URL - scorecard
    print("\n--- Test 2: External URL - scorecard ---")
    try:
        payload = {
            "email": "scorecard@example.com",
            "consent": True,
            "answers": [2, 1, 1, 2, 1, 2, 1, 1, 2, 2],  # Total 15, band "partial"
            "startedAt": int(time.time() * 1000) - 3000,
            "organisation_website": ""
        }
        response = requests.post(f"{EXTERNAL_BASE}/api/scorecard", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('ok') == True and data.get('delivered') == False:
                result = data.get('result', {})
                if result.get('total') == 15 and result.get('band', {}).get('id') == 'partial':
                    results.success("External URL: scorecard works correctly")
                else:
                    results.fail(f"External URL: scorecard returns 200 but result is: {result}")
            else:
                results.fail(f"External URL: scorecard returns 200 but data is: {data}")
        else:
            results.fail(f"External URL: scorecard returns {response.status_code}, expected 200")
    except Exception as e:
        results.fail(f"External URL scorecard test failed with error: {e}")


def test_policy_sandbox_regression(results: TestResults):
    """Regression check: GET /api/policy-sandbox/verify should still return 200 with 72 evaluations."""
    print("\n" + "="*80)
    print("TEST SECTION: Policy Sandbox Regression Check")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/api/policy-sandbox/verify", timeout=10)
        if response.status_code == 200:
            data = response.json()
            evaluations = data.get('evaluations', [])
            if len(evaluations) == 72:
                results.success("Policy Sandbox regression check: 200 with 72 evaluations")
            else:
                results.fail(f"Policy Sandbox returns 200 but has {len(evaluations)} evaluations, expected 72")
        else:
            results.fail(f"Policy Sandbox returns {response.status_code}, expected 200")
    except Exception as e:
        results.fail(f"Policy Sandbox regression check failed with error: {e}")


def main():
    print("="*80)
    print("Comprehensive Backend Testing")
    print("Forms and Scorecard Endpoints")
    print("="*80)
    
    results = TestResults()
    
    # Run all test sections
    test_forms_endpoint(results)
    test_scorecard_endpoint(results)
    test_external_url_happy_path(results)
    test_policy_sandbox_regression(results)
    
    # Print summary
    success = results.summary()
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
