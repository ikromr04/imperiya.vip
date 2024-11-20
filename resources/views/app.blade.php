<!DOCTYPE html>
<html class="font-sourceSans font-normal min-w-80 bg-[#FAFDFD] text-gray-950" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="robots" content="noindex, nofollow">

  <link rel="icon" href="{{ asset('favicon.ico') }}">
  <link rel="icon" href="{{ asset('favicons/icon.svg') }}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="{{ asset('favicons/180x180.png') }}">
  <link rel="manifest" href="{{ asset('manifest.webmanifest') }}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  @vite(['resources/css/public.css'])

  <title>{{ config('app.name') }}</title>
</head>

<body class="flex flex-col group gap-8 mb-8 md:gap-10 md:mb-10 xl:gap-12 xl:mb-12">
  <x-icons />

  <main class="flex flex-col gap-8 md:gap-10 lg:gap-12">
    <x-blocks.vitrin />

    <x-blocks.partners />

    <x-blocks.about />

    <x-blocks.facts />

    <x-blocks.team />

    <x-blocks.gallery />
  </main>

  @vite(['resources/js/public.js'])
</body>

</html>
