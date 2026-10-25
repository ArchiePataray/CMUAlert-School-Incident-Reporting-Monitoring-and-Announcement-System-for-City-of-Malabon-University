/* Read-only walkthrough. The app supplies preview and restore hooks. */
(function () {
  'use strict';
  const step = (route, target, title, text, mode = '') => ({ route, target, title, text, mode });

  function stepsFor(role, activationRequired = false) {
    if (activationRequired) return [
      step('settings', '#current-password', 'Enter your temporary password', 'Use the temporary password provided for your account.'),
      step('settings', '#new-password', 'Choose your own password', 'Enter a unique password, then repeat it in Confirm new password. Follow the character limits shown on the form.'),
      step('settings', '#password-form .form-actions', 'Activate your account', 'Select Change password, then sign in again with your new password. Reopen the guide afterward for a tour of the whole system.'),
    ];
    const admin = role === 'admin';
    return [
      step('dashboard', admin ? '.admin-tools' : '.home-shortcuts', 'Home and quick actions', 'This guide demonstrates every main process using examples and keeps your unfinished work. Use these shortcuts or the menu to move between pages.'),
      ...(admin ? [
        step('reports', '#admin-queue-filters', 'Find an incident report', 'The Incident Reports badge counts reports you have not opened. Use Unread for the recent list, or search and filter all reports. Select Review to open a concern and mark it as viewed.'),
        step('reports/guide-example', '.detail-grid', 'Review the concern', 'Read the incident details, reporting method, and supporting evidence before recording an update. This report is an example.', 'incident'),
        step('reports/guide-example', '#review-action', 'Accept or reject the report', 'Choose an action, check the message, then use the button below to save. Rejection requires a reason. Accepted reports can move to In Progress, Resolved, and Closed.', 'incident'),
        step('reports/guide-example', '#public-update', 'Record progress and the resolution', 'To resolve a report, choose Resolve report and describe the outcome once. Expand Private note for administrator-only details, or History for previous decisions and updates.', 'incident-resolved'),
        step('announcements', '.announcement-filter-panel', 'Manage announcements', 'Search published notices, drafts, and archived updates. Create a new announcement, edit an existing notice, or archive one that is no longer current.'),
        step('announcements/new', '#announcement-form', 'Prepare a campus update', 'Enter a headline, category, audience, and full announcement text. Pin important updates when they should stay above other notices.'),
        step('announcements/new', '#announcement-form .form-actions', 'Preview, save, or publish', 'Preview the announcement before publishing. Save draft to finish later, or Publish to share it with the selected audience.'),
        step('accounts', '#account-filters, .account-filters', 'Find a university account', 'Use User Management to search accounts and filter by role or access. Open an account to manage it, or select Create account.'),
        step('accounts/new', '#managed-name', 'Create a student account', 'Enter the student\'s name and CMU ID or username. Set and confirm a temporary password, then verify with your administrator password. The student changes their password after first sign-in.'),
        step('accounts/edit/guide-example', '#managed-status', 'Manage account access', 'Change Active or Disabled access, record a reason, and verify your administrator password before saving. Access and username changes end the student\'s active sessions.', 'account'),
        step('accounts/edit/guide-example', '#reset-account-password-form', 'Reset an account password', 'Set and confirm a temporary password, add a reason, and verify your administrator password. The person chooses a new password at their next sign-in.', 'account'),
        step('audit', '#audit-filters', 'Review the activity log', 'Search and filter saved actions in Activity Log. Each entry identifies the action, person, time, and related record; use its link when available.'),
        step('inbox/new', '#message-subject', 'Start an Inbox conversation', 'Select New conversation in Inbox. Choose an active recipient, enter a subject and message, then select Send message.'),
        step('inbox/guide-example', '#reply-permission', 'Follow up and manage replies', 'Read messages and send follow-ups in the conversation. Allow or decline reply requests, and disable reply access later when needed.', 'conversation-request'),
      ] : [
        step('report/new', '.category-options', 'Choose a concern category', 'Open Report, select Weapon-Related Concerns, Bullying, or Other Safety Concern, then select Continue.', 'report-category'),
        step('report/new', '#report-form', 'Describe the incident', 'Explain what happened, add the location if known, and enter the date and time. You can add up to three JPG or PNG photos, no larger than 5 MB each.', 'report-details'),
        step('report/new', '.reporting-modes', 'Choose how to report', 'Identified reports are linked to your account. Anonymous reports omit your name and use a private tracking reference for updates.', 'report-details'),
        step('report/new', '#submit-report-form .wizard-footer', 'Review and submit', 'Select Review report and check your details. Use Edit details to make changes, or select Submit report when everything looks correct. The guide only previews this process.', 'report-review'),
        step('report/new', '.tracking-receipt', 'Save the receipt', 'Download your receipt. Identified reports appear in My reports; anonymous receipts also include a private TRK reference. Save that reference to follow anonymous updates.', 'report-anonymous'),
        step('reports', '#report-filters, .unlock-panel', 'Find your reports', 'Open My reports for identified concerns. Unlock with your six-digit passcode if enabled, then search or filter by category, status, and date.'),
        step('reports/guide-example', '.timeline-panel', 'Follow a report\'s progress', 'Open a report to review its details, status history, university updates, and any resolution. This is an example report.', 'incident'),
        step('track', '.tracked-report', 'Track an anonymous report', 'Open Track anonymous report, enter the private TRK reference from your receipt, and select Track report. Read its status and updates here; keep the reference private.', 'tracking-result'),
        step('inbox/guide-example', '#reply-permission', 'Read messages and request a reply', 'Open a conversation in Inbox to read university messages. If replies are disabled, select Request to reply and wait for administrator approval.', 'conversation-request'),
        step('inbox/guide-example', '#message-form', 'Send an Inbox reply', 'Once reply access is approved, enter your message and select Send message. The conversation keeps the message history together.', 'conversation'),
      ]),
      ...(!admin ? [step('announcements', '.announcement-read', 'Read campus announcements', 'Search or filter Announcements, then select Read announcement for the full notice. Check its audience and publication date, and follow the university\'s guidance.', 'announcement')] : []),
      step('dashboard', '.notification-dropdown-content', 'Use the notification dropdown', 'Open the bell beside your profile. Select an update to open it, use Mark all as read to clear unread indicators, or View all notifications for the full list.', 'notifications'),
      step('profile', '.photo-picker', 'Manage your profile photo', 'Open Profile to review your account. Choose a JPG, PNG, or WebP photo up to 2 MB, or remove it to show your initials.'),
      step('profile/details', '#profile-form', 'Update personal details and your password', 'Open Personal information & password. Edit your details and select Save profile. To change your password, enter the current and new passwords, confirm, and save; then sign in again.'),
      ...(!admin ? [step('profile/passcode', '#passcode-form', 'Protect My reports with a passcode', 'Use your account password to set an optional six-digit reports passcode. Enter it when opening locked identified reports.')] : []),
      step('settings', '.preference-panel', 'Choose appearance and text size', 'Open Settings to choose light or dark mode and Small, Medium, or Large text. Pick the size that is comfortable to read.'),
      step('settings', '[data-action="toggle-notifications"]', 'Set notification preferences', 'On the Notifications tab, choose whether the bell shows unread alerts. Updates remain available when alerts are off.', 'notification-settings'),
      ...(admin ? [step('settings', '[data-action="backup-data"]', 'Manage browser data', 'In Browser data, download a backup before a planned reset. Reset local data permanently removes saved accounts and records after confirmation and administrator verification.', 'data-settings')] : []),
      step('profile', '.profile-signout', 'Finish and sign out', 'Save your work, then use Sign out when finished, especially on a shared device. Reopen this guide anytime with the guide button.'),
    ];
  }

  function create({ dialog, escape, icon, getSteps, capture, preview, restore, beforeOpen }) {
    let session = null;
    let frame;
    const observer = new ResizeObserver(() => schedulePosition());
    const visible = (element) => element.getClientRects().length &&
      getComputedStyle(element).visibility !== 'hidden' && !element.closest('[inert]');
    function targetFor(selector) {
      return [...document.querySelectorAll(selector || '#view')].find(visible) || document.querySelector('#view');
    }
    function schedulePosition() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(position);
    }
    function position() {
      if (!session || !dialog.open) return;
      const card = dialog.querySelector('.guide-card');
      const spotlight = dialog.querySelector('.guide-spotlight');
      const width = document.documentElement.clientWidth, height = innerHeight;
      card.style.maxHeight = '';
      let bounds = card.getBoundingClientRect();
      let left = (width - bounds.width) / 2, top = (height - bounds.height) / 2;
      spotlight.hidden = !session.target;
      if (session.target?.isConnected) {
        let rect = session.target.getBoundingClientRect();
        if (rect.bottom < 8 || rect.top > height - 8) {
          session.target.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
          rect = session.target.getBoundingClientRect();
        }
        const x = Math.max(8, Math.min(rect.left - 6, width - 9));
        const right = Math.max(x + 1, Math.min(width - 8, rect.right + 6));
        let y = Math.max(8, Math.min(rect.top - 6, height - 9));
        let bottom = Math.max(y + 1, Math.min(height - 8, rect.bottom + 6));
        if (bottom + 12 + bounds.height <= height - 12) top = bottom + 12;
        else if (y - 12 - bounds.height >= 12) top = y - 12 - bounds.height;
        else if (right + 12 + bounds.width <= width - 12) { left = right + 12; top = y; }
        else if (x - 12 - bounds.width >= 12) { left = x - 12 - bounds.width; top = y; }
        else {
          // Keep the instructions beside a visible part of very tall panels.
          if (Math.max(y - 24, height - bottom - 24) < 180 && bottom - y > height * 0.4) {
            const center = (y + bottom) / 2;
            y = center - height * 0.2;
            bottom = center + height * 0.2;
          }
          const above = y - 24, below = height - bottom - 24;
          card.style.maxHeight = `${Math.max(1, Math.max(above, below))}px`;
          bounds = card.getBoundingClientRect();
          top = above > below ? y - 12 - bounds.height : bottom + 12;
        }
        if (left === (width - bounds.width) / 2) left = x + (right - x - bounds.width) / 2;
        spotlight.style.cssText = `left:${x}px;top:${y}px;width:${right - x}px;height:${bottom - y}px`;
      }
      card.style.left = `${Math.max(12, Math.min(left, width - bounds.width - 12))}px`;
      card.style.top = `${Math.max(12, Math.min(top, height - bounds.height - 12))}px`;
    }
    async function showStep(index) {
      const run = session;
      if (!run || run.busy) return;
      run.index = Math.max(0, Math.min(index, run.steps.length - 1));
      const step = run.steps[run.index];
      const request = ++run.request;
      run.busy = true;
      run.target = null;
      observer.disconnect();
      dialog.innerHTML = `<div class="guide-spotlight" hidden></div><section class="guide-card"><div class="guide-heading"><p class="guide-progress"><span class="sr-only">CMUAlert guide. </span>STEP ${run.index + 1} OF ${run.steps.length} · PREVIEW</p><button type="button" class="icon-button" data-guide="close" aria-label="Close guide">${icon('close')}</button></div><h2 id="guide-title" tabindex="-1">${escape(step.title)}</h2><p id="guide-copy">${escape(step.text)}</p><div class="guide-actions"><button type="button" class="btn btn-text" data-guide="close">Skip</button><button type="button" class="btn btn-secondary" data-guide="back" ${run.index ? '' : 'hidden'} disabled>Back</button><button type="button" class="btn btn-primary" data-guide="next" disabled>${run.index === run.steps.length - 1 ? 'Finish' : 'Next'}</button></div></section>`;
      position();
      try {
        if (!run.snapshot) run.snapshot = capture();
        const selector = await preview(step);
        if (session !== run || request !== run.request) return;
        run.target = targetFor(selector || step.target);
        run.target?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
        observer.observe(dialog.querySelector('.guide-card'));
        if (run.target) observer.observe(run.target);
      } catch (error) {
        if (session !== run || request !== run.request) return;
        dialog.querySelector('#guide-copy').textContent = `This step could not be opened. ${error.message} Select Next to continue, or close the guide.`;
      } finally {
        if (session === run && request === run.request) {
          run.busy = false;
          dialog.querySelectorAll('.guide-actions button').forEach(button => button.disabled = false);
          dialog.querySelector('#guide-title').focus({ preventScroll: true });
          position();
        }
      }
    }
    function end(options = {}) {
      if (!session) return;
      const run = session;
      session = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (run.snapshot) restore(run.snapshot, options);
      document.documentElement.classList.remove('guide-active');
      if (dialog.open) dialog.close();
      dialog.replaceChildren();
      if (options.restore !== false) {
        scrollTo({ left: run.scrollX, top: run.scrollY, behavior: 'instant' });
        const focus = run.focus?.isConnected && run.focus.getClientRects().length
          ? run.focus : document.querySelector('.mobile-menu, .top-help');
        focus?.focus({ preventScroll: true });
      }
    }
    dialog.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || !session) return;
      if (button.dataset.guide === 'close') end();
      else if (session.busy) return;
      else if (button.dataset.guide === 'back') showStep(session.index - 1);
      else if (button.dataset.guide === 'next') {
        if (session.index === session.steps.length - 1) end();
        else showStep(session.index + 1);
      }
    });
    dialog.addEventListener('cancel', event => { event.preventDefault(); end(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); end(); }
      if (event.key === 'Tab') {
        const buttons = [...dialog.querySelectorAll('button:not(:disabled)')].filter(visible);
        const first = buttons[0], last = buttons.at(-1);
        if (event.shiftKey && (!buttons.includes(document.activeElement) || document.activeElement === first)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && (!buttons.includes(document.activeElement) || document.activeElement === last)) {
          event.preventDefault(); first?.focus();
        }
      }
    });
    addEventListener('resize', schedulePosition);
    addEventListener('scroll', schedulePosition, true);
    return {
      get active() { return Boolean(session); },
      get previewing() { return Boolean(session?.snapshot); },
      get originalDirty() { return session?.snapshot?.dirty || false; },
      open() {
        if (session) return;
        const focus = beforeOpen();
        session = { request: 0, focus, scrollX, scrollY, snapshot: null, steps: getSteps() };
        document.documentElement.classList.add('guide-active');
        dialog.showModal();
        showStep(0);
      },
      end,
    };
  }
  globalThis.CMUAlertGuide = Object.freeze({ stepsFor, create });
})();
