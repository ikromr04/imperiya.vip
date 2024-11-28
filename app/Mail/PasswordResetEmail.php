<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetEmail extends Mailable
{
  use Queueable, SerializesModels;

  public $token;

  public function __construct($token)
  {
    $this->token = $token;
  }

  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Сброс пароля',
    );
  }

  public function content(): Content
  {
    return new Content(
      view: 'emails.password-reset-email',
      with: ['token' => $this->token]
    );
  }

  public function attachments(): array
  {
    return [];
  }
}
