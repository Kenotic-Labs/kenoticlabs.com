/* eslint-disable @typescript-eslint/no-unused-vars */
// Kenotic Labs - Google Apps Script backend
// Deploy this as a Web App and set KENOTIC_APPS_SCRIPT_URL in the Next.js app.

const CONFIG = {
  ADMIN_EMAIL: 'info@kenoticlabs.com',
  SHEET_ID: '1Dk-BpNUTt4m8YGjaPifZOvsqNxzEZz2DS1izM0BB-VQ',
  WAITLIST_SHEET: 'Waitlist',
  CONTACT_SHEET: 'Contact',
};

function doGet() {
  const sheet = getOrCreateSheet_(CONFIG.WAITLIST_SHEET, [
    'Email',
    'Name',
    'Interests',
    'Source',
    'Timestamp',
  ]);

  return json_({
    success: true,
    count: Math.max(0, sheet.getLastRow() - 1),
  });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const type = data.type || 'waitlist';

    if (type === 'contact') {
      handleContact_(data);
      return json_({ success: true, message: 'Contact submitted.' });
    }

    handleWaitlist_(data);
    return json_({ success: true, message: 'Waitlist submitted.' });
  } catch (error) {
    return json_({ success: false, error: String(error) });
  }
}

function handleWaitlist_(data) {
  const sheet = getOrCreateSheet_(CONFIG.WAITLIST_SHEET, [
    'Email',
    'Name',
    'Interests',
    'Imagination',
    'Source',
    'Timestamp',
  ]);

  const email = String(data.email || '').trim();
  const name = String(data.name || '').trim();
  const interests = Array.isArray(data.interests) ? data.interests.join(', ') : '';
  const imagination = String(data.imagination || '').trim();
  const source = String(data.source || '').trim();
  const timestamp = new Date(data.timestamp || new Date().toISOString());

  if (!email) throw new Error('Email is required');

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === email) {
      sheet.getRange(i + 1, 2).setValue(name);
      sheet.getRange(i + 1, 3).setValue(interests);
      sheet.getRange(i + 1, 4).setValue(imagination);
      sheet.getRange(i + 1, 5).setValue(source);
      sheet.getRange(i + 1, 6).setValue(timestamp);
      if (!data.skipEmail) {
        sendWaitlistConfirmation_(email, name, interests, true, imagination);
      }
      return;
    }
  }

  sheet.appendRow([email, name, interests, imagination, source, timestamp]);
  if (!data.skipEmail) {
    sendWaitlistConfirmation_(email, name, interests, false, imagination);
  }
}

function handleContact_(data) {
  const sheet = getOrCreateSheet_(CONFIG.CONTACT_SHEET, [
    'Name',
    'Email',
    'Organization',
    'Message',
    'Source',
    'Timestamp',
  ]);

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const organization = String(data.organization || '').trim();
  const message = String(data.message || '').trim();
  const source = String(data.source || '').trim();
  const timestamp = new Date(data.timestamp || new Date().toISOString());

  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required');
  }

  sheet.appendRow([name, email, organization, message, source, timestamp]);

  if (!data.skipAdminEmail) {
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      replyTo: email,
      subject: `[Kenotic Labs] New inquiry from ${name}`,
      body: [
        `Name: ${name}`,
        `Email: ${email}`,
        organization ? `Organization: ${organization}` : '',
        source ? `Source: ${source}` : '',
        `Time: ${timestamp.toISOString()}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }
}

function sendWaitlistConfirmation_(email, name, interests, existing, imagination) {
  const subject = existing
    ? 'Kenotic Labs waitlist preferences updated'
    : 'You are on the Kenotic Labs waitlist';

  const interestLine = interests
    ? `You asked to hear about: ${interests}.`
    : 'We will keep you posted as things become available.';

  const greeting = name ? `Hi ${name},` : 'Hi,';
  const interestArray = interests
    ? interests
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    : [];
  const interestSection = buildInterestSection_(interestArray);
  const reflectionSection = buildReflectionSection_(interestArray, imagination);

  const htmlBody = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f7f5ef;color:#181817;font-family:Georgia,serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
    <div style="background:#fffdf8;border:1px solid #d8d1c3;padding:36px;">
      <p style="margin:0 0 20px;font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
        Kenotic Labs
      </p>
      <h1 style="margin:0 0 20px;font-size:34px;line-height:1.05;font-weight:700;">
        ${existing ? 'Your waitlist preferences were updated.' : 'You are on the list.'}
      </h1>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        ${greeting}
      </p>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        Thanks for your interest in Kenotic Labs. ${interestLine}
      </p>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        We are building technology that can hold onto the shape of a life, not just the residue of a prompt. Something that can understand what remains active, what changed, and what still matters across time.
      </p>
      ${interestSection.html}
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        The real question is not how many tasks a machine can complete. It is what becomes possible when a system can recognize a person, a situation, and a direction well enough to grow with them.
      </p>
      <div style="margin:24px 0;padding:18px 20px;border:1px solid #e2d5bd;background:#f9f5ea;">
        <p style="margin:0;font-size:20px;line-height:1.55;font-style:italic;color:#181817;">
          What gets built when technology stops merely responding, and starts truly understanding?
        </p>
      </div>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        We are early. But if this matters to you too, you are in the right place.
      </p>
      ${reflectionSection.html}
      <p style="margin:28px 0 0;font-size:15px;line-height:1.7;color:#5f655f;">
        info@kenoticlabs.com
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const plainBody = [
    greeting,
    '',
    existing
      ? 'Your Kenotic Labs waitlist preferences were updated.'
      : 'You are on the Kenotic Labs waitlist.',
    '',
    interestLine,
    '',
    'Kenotic Labs is building technology that can hold onto the shape of a life, not just the residue of a prompt. Something that can understand what remains active, what changed, and what still matters across time.',
    '',
    interestSection.text,
    interestSection.text ? '' : '',
    'The real question is not how many tasks a machine can complete. It is what becomes possible when a system can recognize a person, a situation, and a direction well enough to grow with them.',
    '',
    'What gets built when technology stops merely responding, and starts truly understanding?',
    '',
    'We are early. But if this matters to you too, you are in the right place.',
    '',
    reflectionSection.text,
    reflectionSection.text ? '' : '',
    'info@kenoticlabs.com',
  ]
    .filter(Boolean)
    .join('\n');

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    body: plainBody,
  });
}

function buildInterestSection_(interestArray) {
  const sections = [];

  if (interestArray.indexOf('Continuity SDK') !== -1) {
    sections.push({
      html: `
      <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(39,78,61,0.16);background:rgba(39,78,61,0.03);">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          Continuity SDK
        </p>
        <p style="margin:0;font-size:17px;line-height:1.75;color:#5f655f;">
          The SDK will be a developer layer for systems that need more than retrieval. It will let products write, update, and reconstruct living context so assistants, agents, and tools can stay oriented across time instead of resetting at every interaction. In practice, that means software that can remain aware of what is still in progress, what changed, what should return later, and what matters in this particular situation.
        </p>
      </div>`,
      text: [
        'Continuity SDK',
        'The SDK will be a developer layer for systems that need more than retrieval. It will let products write, update, and reconstruct living context so assistants, agents, and tools can stay oriented across time instead of resetting at every interaction. In practice, that means software that can remain aware of what is still in progress, what changed, what should return later, and what matters in this particular situation.',
      ].join('\n'),
    });
  }

  if (interestArray.indexOf('Raya') !== -1) {
    sections.push({
      html: `
      <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(176,140,74,0.18);background:rgba(176,140,74,0.04);">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          Raya
        </p>
        <p style="margin:0;font-size:17px;line-height:1.75;color:#5f655f;">
          Raya will explore what it means for technology to know a person across time with more depth, steadiness, and care. Not just a tool that completes requests, but a system that can stay oriented to a life as it unfolds.
        </p>
      </div>`,
      text: [
        'Raya',
        'Raya will explore what it means for technology to know a person across time with more depth, steadiness, and care. Not just a tool that completes requests, but a system that can stay oriented to a life as it unfolds.',
      ].join('\n'),
    });
  }

  return {
    html: sections.map((section) => section.html).join(''),
    text: sections.map((section) => section.text).join('\n\n'),
  };
}

function buildReflectionSection_(interestArray, imagination) {
  let prompt = '';

  if (interestArray.indexOf('Continuity SDK') !== -1) {
    prompt =
      'If technology could truly understand continuity, what would you want it to become capable of?';
  } else if (interestArray.indexOf('Raya') !== -1) {
    prompt =
      'If a system could grow in understanding over time, what would you hope it could become?';
  }

  if (!prompt) {
    return { html: '', text: '' };
  }

  if (imagination) {
    return {
      html: `
      <div style="margin:28px 0;padding:20px;border:1px solid rgba(24,24,23,0.1);background:rgba(247,245,239,0.75);">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          What you shared
        </p>
        <p style="margin:0 0 16px;font-size:20px;line-height:1.6;font-style:italic;color:#181817;">
          ${prompt}
        </p>
        <div style="min-height:88px;padding:14px 16px;border:1px solid rgba(24,24,23,0.1);background:rgba(255,255,255,0.65);font-size:16px;line-height:1.7;color:#5f655f;">
          ${escapeHtml_(imagination)}
        </div>
      </div>`,
      text: ['What you shared', '', prompt, '', imagination].join('\n'),
    };
  }

  return {
    html: `
      <div style="margin:28px 0;padding:20px;border:1px solid rgba(24,24,23,0.1);background:rgba(247,245,239,0.75);">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          If this sparks something
        </p>
        <p style="margin:0 0 16px;font-size:20px;line-height:1.6;font-style:italic;color:#181817;">
          ${prompt}
        </p>
        <p style="margin:0;font-size:16px;line-height:1.75;color:#7a7f79;">
          If you left a thought when you joined, we keep it with your place on the list.
        </p>
      </div>`,
    text: [
      'If this sparks something',
      '',
      prompt,
      '',
      'If you left a thought when you joined, we keep it with your place on the list.',
    ].join('\n'),
  };
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getOrCreateSheet_(name, headers) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return sheet;
  }

  const existingHeaders = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
    .getValues()[0]
    .map((value) => String(value).trim());

  headers.forEach(function (header, index) {
    if (existingHeaders[index] !== header) {
      sheet.getRange(1, index + 1).setValue(header);
    }
  });

  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);

  return sheet;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
