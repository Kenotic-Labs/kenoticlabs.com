"""
Quick screenshot tool for design iteration.
Usage: python scripts/screenshot.py [section_number]
  - No args: captures hero + full page
  - With number: scrolls to that viewport section and captures
"""
import sys
from playwright.sync_api import sync_playwright

URL = "http://localhost:3000"
OUT = "screenshots"

def capture(section=None):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        if section is None:
            page.screenshot(path=f"{OUT}/hero.png")
            page.screenshot(path=f"{OUT}/full.png", full_page=True)
            print(f"Saved {OUT}/hero.png and {OUT}/full.png")
        else:
            n = int(section)
            page.evaluate(f"window.scrollTo(0, window.innerHeight * {n})")
            page.wait_for_timeout(1500)
            page.screenshot(path=f"{OUT}/section-{n}.png")
            print(f"Saved {OUT}/section-{n}.png")

        browser.close()

if __name__ == "__main__":
    import os
    os.makedirs(OUT, exist_ok=True)
    capture(sys.argv[1] if len(sys.argv) > 1 else None)
