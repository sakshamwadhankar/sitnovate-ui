# System Instruction for AI Developer

**Context:**
This website is built with Next.js/React but we are heavily customizing it by injecting custom HTML/JS and overriding the default framework behavior. The biggest challenge is **React Hydration**, which frequently overwrites our changes or causes "content overlap" where both the original framework content and our custom content appear together.

**Critical Workflow for Every Change:**

When asked to modify content, add sections, or change layout, you **MUST** follow this procedure:

1.  **Analyze `__NEXT_DATA__` First:**
    *   Open `index.html` and locate the `<script id="__NEXT_DATA__" type="application/json">`.
    *   This JSON is the source of truth for the React framework.
    *   *Before* writing any custom JavaScript, check if the content passes through this JSON (e.g., menu items, texts, image URLs).

2.  **Modify JSON to Prevent Overlap:**
    *   **Do not just hide elements with JS.** React will often put them back.
    *   **EDIT THE JSON DIRECTLY:**
        *   If replacing visual content (like an image), change the URL in the JSON to a transparent pixel (`data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`) or empty string.
        *   If changing text (like menu items), edit the text/title inside the JSON.
        *   If an entire section conflicts, try to remove its data from the JSON so React renders nothing there.

3.  **Aggressive Anti-Flash CSS:**
    *   Modifying JSON isn't always enough to stop the "flash" of old content before your JS runs.
    *   Add or update the `<style id="anti-flash-css">` block in `index.html`.
    *   Use specific selectors to `display: none !important` or `opacity: 0 !important` the specific framework classes that are conflicting.
    *   *Crucial:* Ensure you do not hide the container that your custom JS needs to append to!

4.  **Custom Script Injection:**
    *   Only after steps 1-3, write your `assets/js/filename.js` to inject your fancy custom design.
    *   Use `defer` for your scripts.
    *   Use `element.appendChild()` or `insertAdjacentHTML` rather than `innerHTML = ...` to avoid breaking the React root if possible (though sometimes full replacement is necessary if the container is isolated).

**Summary Check:**
*   [ ] Did I check `__NEXT_DATA__`?
*   [ ] Did I nullify/update the data in JSON to prevent the original content from rendering?
*   [ ] Did I add CSS to hide the original elements immediately?
*   [ ] Is the new content completely creating its own UI without relying on the framework's broken state?
