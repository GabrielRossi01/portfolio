import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, to } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        //Verifica se a API key está configurada
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: to || 'rossi17006@gmail.com',
            replyTo: email,
            subject: `Nova mensagem de contato de ${name}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 10px;
                padding: 30px;
                color: white;
              }
              .content {
                background: white;
                color: #333;
                border-radius: 8px;
                padding: 25px;
                margin-top: 20px;
              }
              .header {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .label {
                font-weight: bold;
                color: #667eea;
                margin-top: 15px;
                margin-bottom: 5px;
              }
              .message {
                background: #f7fafc;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #667eea;
                margin-top: 10px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                opacity: 0.8;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">📧 Nova Mensagem de Contato</div>
              <p>Você recebeu uma nova mensagem através do formulário de contato do seu portfólio.</p>
              
              <div class="content">
                <div class="label">👤 Nome:</div>
                <div>${name}</div>
                
                <div class="label">📧 Email:</div>
                <div>${email}</div>
                
                <div class="label">💬 Mensagem:</div>
                <div class="message">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                Esta mensagem foi enviada através do formulário de contato do seu portfólio.
              </div>
            </div>
          </body>
        </html>
      `,
        });

        return NextResponse.json(
            { sucess: true, data},
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}