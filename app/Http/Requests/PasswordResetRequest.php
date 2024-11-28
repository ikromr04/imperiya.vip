<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordResetRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'token' => 'required',
      'password' => 'required|min:6',
      'password_confirmation' => 'required|same:password',
    ];
  }

  public function messages(): array
  {
    return [
      'password.required' => 'Пароль обязателен.',
      'password.min' => 'Пароль должен содержать не менее :min символов.',
      'password_confirmation.required' => 'Подтверждение пароля не обязателен.',
      'password_confirmation.same' => 'Подтверждение пароля не совпадает.',
    ];
  }
}
