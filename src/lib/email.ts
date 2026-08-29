import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified email as sender
// This allows sending to ANY email address (not just your own)
const EMAIL_FROM = process.env.EMAIL_FROM || 'abdullahtariq5044@gmail.com';

export interface AssessmentEmailData {
  clientName: string;
  clientEmail: string;
  clientId: string;
  petName: string;
  primaryConcern: string;
  submittedAt: Date;
}

export interface AppointmentEmailData {
  clientName: string;
  clientEmail: string;
  petName: string;
  appointmentDate: Date;
  primaryConcern: string;
  vetBehaviouristName?: string;
}

/**
 * Send assessment submission confirmation email to client
 */
export async function sendAssessmentConfirmationEmail(data: AssessmentEmailData) {
  try {
    const { clientName, clientEmail, clientId, petName, primaryConcern, submittedAt } = data;
    
    const firstName = clientName.split(' ')[0];
    const formattedDate = submittedAt.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assessment Received - NeuroPet</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FBF7F0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF7F0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1E4A40; padding: 40px 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🐾 NeuroPet</h1>
              <p style="color: #E8F3F1; margin: 8px 0 0; font-size: 14px;">Canine Behaviour Consultation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1E4A40; margin: 0 0 20px; font-size: 24px; font-weight: 700;">Assessment Received Successfully! ✅</h2>
              
              <p style="color: #4A5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Dear <strong>${firstName}</strong>,
              </p>

              <p style="color: #4A5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for submitting your behaviour assessment for <strong>${petName}</strong>. We've received your information and our expert team will review it carefully.
              </p>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F7FAFC; border-left: 4px solid #D97540; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: #2D3748; font-size: 14px; margin: 0 0 12px; font-weight: 600;">📋 Assessment Details</p>
                    <table width="100%" cellpadding="4" cellspacing="0">
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Pet Name:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0;">${petName}</td>
                      </tr>
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Primary Concern:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0;">${primaryConcern}</td>
                      </tr>
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Submitted:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Client ID:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0; font-family: monospace;">${clientId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h3 style="color: #1E4A40; margin: 30px 0 15px; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
              
              <ol style="color: #4A5568; font-size: 15px; line-height: 1.8; margin: 0 0 25px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Our team will review your assessment within <strong>24-48 hours</strong></li>
                <li style="margin-bottom: 8px;">We'll contact you to schedule a consultation appointment</li>
                <li style="margin-bottom: 8px;">You'll receive a detailed behaviour plan tailored to ${petName}</li>
              </ol>

              <!-- Client Portal Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/client/login" 
                       style="display: inline-block; background-color: #1E4A40; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Access Client Portal
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 25px 0 0; padding-top: 25px; border-top: 1px solid #E2E8F0;">
                <strong>Important:</strong> Keep your Client ID safe. You'll need it to register for the client portal and track your assessment progress.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F7FAFC; padding: 30px 40px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 13px; margin: 0 0 10px;">
                Need help? Contact us at <a href="mailto:info@neuropet.com" style="color: #1E4A40; text-decoration: none;">info@neuropet.com</a>
              </p>
              <p style="color: #A0AEC0; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} NeuroPet. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const textContent = `
Assessment Received Successfully!

Dear ${firstName},

Thank you for submitting your behaviour assessment for ${petName}. We've received your information and our expert team will review it carefully.

Assessment Details:
- Pet Name: ${petName}
- Primary Concern: ${primaryConcern}
- Submitted: ${formattedDate}
- Client ID: ${clientId}

What Happens Next?
1. Our team will review your assessment within 24-48 hours
2. We'll contact you to schedule a consultation appointment
3. You'll receive a detailed behaviour plan tailored to ${petName}

Access your client portal: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/client/login

Important: Keep your Client ID safe. You'll need it to register for the client portal and track your assessment progress.

Need help? Contact us at info@neuropet.com

© ${new Date().getFullYear()} NeuroPet. All rights reserved.
    `;

    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: clientEmail,
      subject: `Assessment Received for ${petName} - NeuroPet`,
      html: htmlContent,
      text: textContent,
    });

    console.log('✅ Assessment confirmation email sent:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send assessment confirmation email:', error);
    return { success: false, error };
  }
}

/**
 * Send appointment scheduled confirmation email to client
 */
export async function sendAppointmentScheduledEmail(data: AppointmentEmailData) {
  try {
    const { clientName, clientEmail, petName, appointmentDate, primaryConcern, vetBehaviouristName } = data;
    
    const firstName = clientName.split(' ')[0];
    const formattedDate = appointmentDate.toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmed - NeuroPet</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FBF7F0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF7F0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1E4A40; padding: 40px 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🐾 NeuroPet</h1>
              <p style="color: #E8F3F1; margin: 8px 0 0; font-size: 14px;">Canine Behaviour Consultation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1E4A40; margin: 0 0 20px; font-size: 24px; font-weight: 700;">🗓️ Your Appointment is Confirmed!</h2>
              
              <p style="color: #4A5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Dear <strong>${firstName}</strong>,
              </p>

              <p style="color: #4A5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Great news! Your consultation appointment for <strong>${petName}</strong> has been scheduled and confirmed.
              </p>

              <!-- Appointment Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #D97540 0%, #1E4A40 100%); border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="color: #ffffff; font-size: 14px; margin: 0 0 8px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Your Appointment</p>
                    <p style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; line-height: 1.4;">${formattedDate}</p>
                  </td>
                </tr>
              </table>

              <!-- Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F7FAFC; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: #2D3748; font-size: 14px; margin: 0 0 12px; font-weight: 600;">📋 Consultation Details</p>
                    <table width="100%" cellpadding="4" cellspacing="0">
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Pet Name:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0;">${petName}</td>
                      </tr>
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Main Concern:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0;">${primaryConcern}</td>
                      </tr>
                      ${vetBehaviouristName ? `
                      <tr>
                        <td style="color: #718096; font-size: 14px; padding: 4px 0;">Behaviourist:</td>
                        <td style="color: #2D3748; font-size: 14px; font-weight: 600; padding: 4px 0;">${vetBehaviouristName}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <h3 style="color: #1E4A40; margin: 30px 0 15px; font-size: 18px; font-weight: 600;">📝 Preparation Tips</h3>
              
              <ul style="color: #4A5568; font-size: 15px; line-height: 1.8; margin: 0 0 25px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Keep a diary of ${petName}'s behaviour before the appointment</li>
                <li style="margin-bottom: 8px;">Note any triggers or patterns you've observed</li>
                <li style="margin-bottom: 8px;">Prepare any questions you'd like to ask</li>
                <li style="margin-bottom: 8px;">Ensure ${petName} is on their normal routine before the session</li>
              </ul>

              <!-- Portal Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/client/dashboard" 
                       style="display: inline-block; background-color: #1E4A40; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      View in Client Portal
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 25px 0 0; padding-top: 25px; border-top: 1px solid #E2E8F0;">
                <strong>Need to reschedule or have questions?</strong><br>
                Contact us at least 24 hours before your appointment via the client portal or email us.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F7FAFC; padding: 30px 40px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 13px; margin: 0 0 10px;">
                Questions? Contact us at <a href="mailto:info@neuropet.com" style="color: #1E4A40; text-decoration: none;">info@neuropet.com</a>
              </p>
              <p style="color: #A0AEC0; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} NeuroPet. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const textContent = `
Your Appointment is Confirmed!

Dear ${firstName},

Great news! Your consultation appointment for ${petName} has been scheduled and confirmed.

Your Appointment:
${formattedDate}

Consultation Details:
- Pet Name: ${petName}
- Main Concern: ${primaryConcern}
${vetBehaviouristName ? `- Behaviourist: ${vetBehaviouristName}` : ''}

Preparation Tips:
- Keep a diary of ${petName}'s behaviour before the appointment
- Note any triggers or patterns you've observed
- Prepare any questions you'd like to ask
- Ensure ${petName} is on their normal routine before the session

View in Client Portal: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/client/dashboard

Need to reschedule or have questions?
Contact us at least 24 hours before your appointment via the client portal or email us.

Questions? Contact us at info@neuropet.com

© ${new Date().getFullYear()} NeuroPet. All rights reserved.
    `;

    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: clientEmail,
      subject: `Appointment Confirmed: ${formattedDate} - NeuroPet`,
      html: htmlContent,
      text: textContent,
    });

    console.log('✅ Appointment confirmation email sent:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send appointment confirmation email:', error);
    return { success: false, error };
  }
}
