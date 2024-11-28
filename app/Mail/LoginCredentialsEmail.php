<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LoginCredentialsEmail extends Mailable
{
  use Queueable, SerializesModels;

  public $credentials;

  public function __construct($credentials)
  {
    $this->credentials = $credentials;
  }

  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Сброс пароля прошел успешно',
    );
  }

  public function content(): Content
  {
    return new Content(
      view: 'emails.password-reset-success',
      with: ['credentials' => $this->credentials]
    );
  }

  public function attachments(): array
  {
    return [];
  }
}
