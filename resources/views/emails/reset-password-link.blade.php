<!DOCTYPE html>
<html class="font-sourceSans" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="robots" content="noindex, nofollow">

  <link rel="icon" href="{{ asset('favicon.ico') }}">
  <link rel="icon" href="{{ asset('favicons/icon.svg') }}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="{{ asset('favicons/180x180.png') }}">
  <link rel="manifest" href="{{ asset('manifest.webmanifest') }}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
  <title>{{ env('APP_NAME') }}</title>
  @vite(['resources/css/emails.css'])
</head>

<body>
  <div class="flex flex-col min-w-screen min-h-screen bg-gray-100 text-gray-600">
    <main class="flex flex-col items-center justify-center min-h-screen bg-illustrations bg-white bg-bottom bg-contain bg-no-repeat md:bg-transparent">
      <a class="mt-8 mb-4 md:mt-12 md:mb-6 xl:mt-0 max-w-max max-h-max" href="/">
        <picture>
          <source media="(min-width: 640px)" srcset="/images/main-logo-dark.desktop.svg" width="185" height="52">
          <source srcset="/images/main-logo-dark.mobile.svg" width="40" height="40"><img src="/images/main-logo-dark.mobile.svg" alt="Логотип школы «Империя Знаний»">
        </picture>
      </a>
      <div class="w-[90vw] max-w-[520px] mx-auto mb-16 md:bg-white md:shadow-md sm:rounded-lg md:p-10 md:mb-20 xl:mb-28">
        <h1 class="title mb-2">Сброс пароля</h1>
        <p class="text-gray-600 mb-6">
          Вы получили это письмо, потому что мы получили запрос на сброс пароля для вашей учетной записи.
        </p>
        <a class="justify-center flex items-center h-9 bg-brand text-white mb-6 max-w-max font-semibold rounded-md shadow-lg px-6 transition-all duration-300 hover:bg-blue-600 hover:shadow-none" href="{{ route('journal', "auth/reset-password/$token") }}">
          Сбросить пароль
        </a>

        <div class="text-gray-600">
          <p><strong>Срок действия ссылки для сброса пароля истекает через 60 минут.</strong></p>
          <p>Если вы не запрашивали сброс пароля, никаких дальнейших действий не требуется.</p>
        </div>
      </div>
    </main>
  </div>
</body>

</html>
