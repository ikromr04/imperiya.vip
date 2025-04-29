<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class UserUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => ['string', 'max:255'],
      'surname' => ['string', 'max:255'],
      'patronymic' => ['nullable', 'string', 'max:255'],
      'login' => ['string', 'max:255'],
      'password' => ['nullable', 'string', 'min:1'],
      'sex' => ['in:male,female'],
      'birth_date' => ['date'],
      'nationality_id' => ['integer', 'exists:nationalities,id'],
      'email' => ['nullable', 'email', 'max:255'],

      'address' => ['nullable', 'array'],
      'address.physical_address' => ['required_with:address', 'string', 'max:255'],
      'address.region' => ['required_with:address', 'string', 'max:255'],

      'social_link' => ['nullable', 'array'],
      'social_link.facebook' => ['nullable', 'url'],
      'social_link.instagram' => ['nullable', 'url'],
      'social_link.telegram' => ['nullable', 'url'],
      'social_link.odnoklassniki' => ['nullable', 'url'],

      'phone_numbers' => ['nullable', 'array'],
      'phone_numbers.*.numbers' => ['required_with:phone_numbers', 'numeric'],
      'phone_numbers.*.code' => ['required_with:phone_numbers', 'numeric'],

      'whatsapp' => ['nullable', 'array'],
      'whatsapp.code' => ['required_with:whatsapp', 'numeric'],
      'whatsapp.numbers' => ['required_with:whatsapp', 'numeric'],
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Поле "id" обязательно для заполнения.',
      'id.integer' => 'Поле "id" должно быть числом.',
      'id.exists' => 'Пользователь с таким ID не найден.',

      'name.string' => 'Поле "Имя" должно быть строкой.',
      'name.max' => 'Поле "Имя" не должно превышать 255 символов.',

      'surname.string' => 'Поле "Фамилия" должно быть строкой.',
      'surname.max' => 'Поле "Фамилия" не должно превышать 255 символов.',

      'patronymic.string' => 'Поле "Отчество" должно быть строкой.',
      'patronymic.max' => 'Поле "Отчество" не должно превышать 255 символов.',

      'login.string' => 'Поле "Логин" должно быть строкой.',
      'login.max' => 'Поле "Логин" не должно превышать 255 символов.',

      'sex.in' => 'Поле "Пол" должно быть одним из следующих значений: Мужской, Женский',

      'birth_date.date' => 'Поле "Дата рождения" должно быть корректной датой.',

      'nationality_id.integer' => 'Поле "Национальность" должно быть числом.',
      'nationality_id.exists' => 'Выбранная национальность не найдена.',

      'email.email' => 'Поле "Email" должно содержать корректный адрес.',
      'email.max' => 'Поле "Email" не должно превышать 255 символов.',

      'address.array' => 'Поле "Адрес" должно быть обектом.',
      'address.physical_address.required_with' => 'Поле "Фактический адрес" обязательно при наличии адреса.',
      'address.region.required_with' => 'Поле "Район" обязательно при наличии адреса.',

      'social_link.array' => 'Поле "Социальные сети" должно быть массивом.',
      'social_link.*.url' => 'Поле ":attribute" должно содержать корректную ссылку.',

      'phone_numbers.array' => 'Поле "Номера телефонов" должно быть массивом.',
      'phone_numbers.*.numbers.required_with' => 'Поле "Номер телефона" обязательно.',
      'phone_numbers.*.code.required_with' => 'Поле "Код страны" обязательно.',

      'whatsapp.array' => 'Поле "WhatsApp" должно быть массивом.',
      'whatsapp.code.required_with' => 'Поле "Код WhatsApp" обязательно.',
      'whatsapp.numbers.required_with' => 'Поле "Номер WhatsApp" обязательно.',
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
