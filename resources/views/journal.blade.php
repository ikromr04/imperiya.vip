<!DOCTYPE html>
<html class="font-sourceSans" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="robots" content="noindex, nofollow">

  <link href="{{ asset('favicon.ico') }}" rel="icon">
  <link href="{{ asset('favicons/icon.svg') }}" rel="icon" type="image/svg+xml">
  <link href="{{ asset('favicons/180x180.png') }}" rel="apple-touch-icon">
  <link href="{{ asset('manifest.webmanifest') }}" rel="manifest">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">

  <title>{{ env('APP_NAME') }}</title>
</head>

<body class="styled-scrollbar">
  <div id="root"></div>

  @viteReactRefresh
  @vite('resources/js/main.tsx')
</body>

</html>
