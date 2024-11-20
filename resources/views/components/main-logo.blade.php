<div {{ $attributes->merge([
    'class' => 'flex max-w-max max-h-max',
]) }}>
  <picture>
    <source media="(min-width: 640px)" srcSet="{{ asset('/images/main-logo.desktop.svg') }}" width="185" height="52">
    <source srcSet="{{ asset('/images/main-logo.mobile.svg') }}" width="40" height="40">
    <img src="{{ asset('/images/main-logo.mobile.svg') }}" alt="Логотип школы «Империя Знаний»">
  </picture>
</div>
