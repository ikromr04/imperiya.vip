<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class LoginRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'email' => 'required|email|exists:users,email',
      'password' => ['required', function ($attribute, $value, $fail) {
        $user = User::where('email', $this->email)->first();

        if ($user && !Hash::check($value, $user->password)) {
          $fail('Неверный пароль.');
        }
      }],
    ];
  }

  public function messages(): array
  {
    return [
      'email.required' => 'Требуется электронная почта.',
      'email.email' => 'Пожалуйста, укажите действительный адрес электронной почты.',
      'email.exists' => 'Нам не удалось найти пользователя с таким адресом электронной почты.',
      'password.required' => 'Пароль обязательно для заполнения.',
    ];
  }
}
