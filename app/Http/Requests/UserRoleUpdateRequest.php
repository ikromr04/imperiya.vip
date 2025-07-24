<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class UserRoleUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'grades' => ['nullable', 'array'],
      'grades.*' => ['nullable', 'exists:grades,id'],
      'education' => ['nullable', 'string', 'not_regex:/^\d+$/'],
      'achievements' => ['nullable', 'string', 'not_regex:/^\d+$/'],
      'work_experience' => ['nullable', 'string', 'not_regex:/^\d+$/'],

      'children' => ['nullable', 'array'],
      'children.*' => ['nullable', 'exists:users,id'],
      'profession_id' => ['nullable', 'exists:professions,id'],
      'workplace' => ['nullable', 'string', 'not_regex:/^\d+$/'],
      'position' => ['nullable', 'string', 'not_regex:/^\d+$/'],

      'grade_id' => ['nullable', 'exists:grades,id'],
      'mother_id' => ['nullable', 'exists:users,id'],
      'father_id' => ['nullable', 'exists:users,id'],
      'admission_date' => ['nullable', 'date'],
      'previous_schools' => ['nullable', 'string', 'not_regex:/^\d+$/'],
      'medical_recommendations' => ['nullable', 'string', 'not_regex:/^\d+$/'],
      'talents' => ['nullable', 'string', 'not_regex:/^\d+$/'],
    ];
  }

  public function messages(): array
  {
    return [
      'grades.array' => 'Поле "Руководитель" должно быть массивом.',
      'grades.*.exists' => 'Каждое значение в поле "Руководитель" должно существовать в базе данных.',
      'education.string' => 'Поле "Образование" должно быть строкой.',
      'education.not_regex' => 'Поле "Образование" не может содержать только цифры.',
      'achievements.string' => 'Поле "Достижения" должно быть строкой.',
      'achievements.not_regex' => 'Поле "Достижения" не может содержать только цифры.',
      'work_experience.string' => 'Поле "Опыт работы" должно быть строкой.',
      'work_experience.not_regex' => 'Поле "Опыт работы" не может содержать только цифры.',

      'children.array' => 'Поле "Дети" должно быть массивом.',
      'children.*.exists' => 'Каждое значение в поле "Дети" должно существовать в базе данных.',
      'profession_id.exists' => 'Указанная профессия не существует.',
      'workplace.string' => 'Поле "Место работы" должно быть строкой.',
      'workplace.not_regex' => 'Поле "Место работы" не может содержать только цифры.',
      'position.string' => 'Поле "Должность" должно быть строкой.',
      'position.not_regex' => 'Поле "Должность" не может содержать только цифры.',

      'grade_id.exists' => 'Указанный класс не существует.',
      'mother_id.exists' => 'Указанная мать не существует.',
      'father_id.exists' => 'Указанный отец не существует.',
      'admission_date.date' => 'Поле "Дата поступления" должно быть датой.',
      'previous_schools.string' => 'Поле "Предыдущие школы" должно быть строкой.',
      'previous_schools.not_regex' => 'Поле "Предыдущие школы" не может содержать только цифры.',
      'medical_recommendations.string' => 'Поле "Медицинские рекомендации" должно быть строкой.',
      'medical_recommendations.not_regex' => 'Поле "Медицинские рекомендации" не может содержать только цифры.',
      'talents.string' => 'Поле "Таланты" должно быть строкой.',
      'talents.not_regex' => 'Поле "Таланты" не может содержать только цифры.',
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
