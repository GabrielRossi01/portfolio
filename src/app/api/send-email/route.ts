import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['rossi17006@gmail.com'],
      replyTo: email,
      subject: `New contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 40px 20px; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          
          <!-- Container Principal -->
          <div style="max-width: 600px; margin: 0 auto; position: relative;">
            
            <!-- Liquid Gradient Background (tons de cinza) -->
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 100%); border-radius: 24px; filter: blur(40px);"></div>
            
            <!-- Glass Card -->
            <div style="position: relative; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);">
              
              <!-- Header Monocromático -->
              <div style="background: linear-gradient(120deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%); padding: 40px 32px; text-align: center; position: relative; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="position: absolute; inset: 0; background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.08), transparent 60%);"></div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; position: relative;">
                  ✉️ New Contact Message
                </h1>
                <p style="color: rgba(255, 255, 255, 0.6); margin: 8px 0 0 0; font-size: 14px; position: relative;">From your portfolio contact form</p>
              </div>

              <!-- Content -->
              <div style="padding: 40px 32px;">
                
                <!-- Name Card -->
                <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #ffffff, #a3a3a3); border-radius: 50%; box-shadow: 0 0 12px rgba(255, 255, 255, 0.3);"></div>
                    <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Name</p>
                  </div>
                  <p style="margin: 0; font-size: 20px; font-weight: 600; color: #f3f4f6; letter-spacing: -0.3px;">${name}</p>
                </div>

                <!-- Email Card -->
                <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #d4d4d4, #737373); border-radius: 50%; box-shadow: 0 0 12px rgba(212, 212, 212, 0.3);"></div>
                    <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email</p>
                  </div>
                  <p style="margin: 0; font-size: 18px;">
                    <a href="mailto:${email}" style="color: #e5e7eb; text-decoration: none; font-weight: 500; border-bottom: 1px solid rgba(229, 231, 235, 0.3); transition: all 0.2s;">${email}</a>
                  </p>
                </div>

                <!-- Message Card -->
                <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 24px;">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #a3a3a3, #525252); border-radius: 50%; box-shadow: 0 0 12px rgba(163, 163, 163, 0.3);"></div>
                    <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</p>
                  </div>
                  <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #d1d5db; white-space: pre-wrap;">${message}</p>
                </div>

                <!-- Reply Button -->
                <div style="margin-top: 32px; text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1f1f1f, #2d2d2d); color: white; padding: 14px 32px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5); transition: all 0.3s;">
                    Reply to ${name}
                  </a>
                </div>

              </div>

              <!-- Footer -->
              <div style="background: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 24px 32px; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                  Sent via <strong style="color: #d1d5db;">Gabriel Rossi Portfolio</strong><br>
                  <span style="font-size: 11px; color: #4b5563;">Powered by Resend</span>
                </p>
              </div>

            </div>
          </div>

        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
