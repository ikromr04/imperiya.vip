@props(['teammate'])

<article {{ $attributes->merge([
    'class' => 'relative flex flex-col w-60 md:mt-[5px]',
]) }}>
  <div class="hidden md:block pointer-events-none absolute -top-[5px] left-0 h-10 rounded-[10px] bg-primary w-[120px] -z-10"></div>

  <div class="w-60 h-60 border border-primary mb-4 rounded-[10px] overflow-hidden md:h-[360px]">
    <img class="block object-cover w-full h-full" src="{{ asset('/images/team/' . $teammate['avatar']) }}" width="400" height="400" alt="{{ $teammate['name'] }}">
  </div>

  <h2 class="flex flex-col font-semibold text-lg leading-[1.2]">
    {{ $teammate['name'] }}
    <small class="text-lg font-light">{{ $teammate['position'] }}</small>
  </h2>
</article>
