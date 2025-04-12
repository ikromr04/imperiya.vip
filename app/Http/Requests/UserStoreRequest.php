<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class UserStoreRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => ['required', 'string'],
      'surname' => ['required', 'string'],
      'patronymic' => ['nullable', 'string'],
      'role' => ['required', Rule::in(['admin', 'parent', 'teacher'])],
      'sex' => ['required', Rule::in(['male', 'female'])],
      'birth_date' => ['required', 'date'],
      'nationality_id' => ['required', 'integer', 'min:1'],
      'email' => ['nullable', 'email'],

      'address' => ['required', 'array'],
      'address.physical_address' => ['required', 'string'],
      'address.region' => ['required', 'string'],

      'phone_numbers' => ['required', 'array'],
      'phone_numbers.code' => ['required'],
      'phone_numbers.numbers' => ['required'],

      'whatsapp' => ['required', 'array'],
      'whatsapp.code' => ['required'],
      'whatsapp.numbers' => ['required'],
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Имя обязательно.',
      'surname.required' => 'Фамилия обязательна.',
      'role.required' => 'Укажите позицию.',
      'sex.required' => 'Укажите пол.',
      'birth_date.required' => 'Дата рождения обязательна.',
      'birth_date.date' => 'Неверный формат даты рождения.',
      'nationality_id.required' => 'Укажите национальность.',
      'nationality_id.min' => 'Укажите национальность.',
      'email.email' => 'Неверный формат email.',

      'address.physical_address.required' => 'Физический адрес обязателен.',
      'address.region.required' => 'Регион обязателен.',

      'phone_numbers.code.required' => 'Код телефона обязателен.',
      'phone_numbers.numbers.required' => 'Номер телефона обязателен.',

      'whatsapp.code.required' => 'Код WhatsApp обязателен.',
      'whatsapp.numbers.required' => 'Номер WhatsApp обязателен.',
    ];
  }

  protected function prepareForValidation()
  {
    $this->replace($this->trimRecursive($this->all()));
  }

  private function trimRecursive($value)
  {
    if (is_array($value)) {
      return array_map([$this, 'trimRecursive'], $value);
    }

    return is_string($value) ? trim($value) : $value;
  }
  protected function failedValidation(Validator $validator)
  {
    $rawErrors = (new ValidationException($validator))->errors();
    $structuredErrors = [];

    foreach ($rawErrors as $key => $messages) {
      $segments = explode('.', $key);
      $ref = &$structuredErrors;

      foreach ($segments as $i => $segment) {
        if (is_numeric($segment)) {
          $segment = (int) $segment;
          if (!isset($ref[$segment])) {
            $ref[$segment] = [];
          }
          $ref = &$ref[$segment];
        } elseif ($i === count($segments) - 1) {
          if (!isset($ref[$segment])) {
            $ref[$segment] = $messages;
          } else {
            $ref[$segment] = array_merge($ref[$segment], $messages);
          }
        } else {
          if (!isset($ref[$segment])) {
            $ref[$segment] = [];
          }
          $ref = &$ref[$segment];
        }
      }
    }

    throw new HttpResponseException(response()->json([
      'message' => 'Validation failed.',
      'errors' => $structuredErrors,
    ], 422));
  }
}
