<header {{ $attributes->merge([
    'class' => 'transition-all duration-150',
]) }}>
  <div class="container flex items-center pt-6 gap-3 sm:gap-4 md:pt-7 lg:items-end">
    <x-main-logo class="justify-self-center order-1 mr-auto lg:mr-0" />

    <x-layouts.navigation class="order-3 lg:order-2 lg:mx-auto" />

    <a class="flex items-center justify-center max-w-max max-h-max justify-self-end min-w-8 min-h-8 sm:min-h-10 order-2 text-white bg-emerald-500 shadow-md transition-all duration-150 hover:shadow-none hover:bg-emerald-600 rounded-md px-3 sm:px-5 lg:order-3" href="{{ route('journal', 'journal') }}">
      <span>{{ __('Онлайн-журнал') }}</span>
      <svg class="hidden" width="24" height="24">
        <use xlink:href="#journal" />
      </svg>
    </a>
  </div>
</header>
