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
      'login' => 'required|exists:users,login',
      'password' => ['required', function ($attribute, $value, $fail) {
        $user = User::where('login', $this->login)->first();

        if ($user && !Hash::check($value, $user->password)) {
          $fail('Неверный пароль.');
        }
      }],
    ];
  }

  public function messages(): array
  {
    return [
      'login.required' => 'Требуется логин.',
      'login.exists' => 'Нам не удалось найти пользователя с таким логином.',
      'password.required' => 'Пароль обязательно для заполнения.',
    ];
  }
}
