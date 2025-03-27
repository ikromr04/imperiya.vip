@props(['review'])

<article {{ $attributes->merge(['class' => 'relative flex flex-col w-[240px] md:w-full md:mt-[5px] group mx-auto']) }} data-sizable-wrapper>
  <div class="hidden md:block pointer-events-none absolute -top-[5px] left-0 h-10 rounded-[10px] bg-primary w-[120px] -z-10"></div>
  <div class="bg-white py-8 px-5 rounded-[10px] border border-primary min-h-[300px]">
    <header class="mb-3">
      <div class="flex items-center gap-x-2 mb-2">
        <span class="text-white w-12 h-1/2 min-w-12 min-h-12 flex items-center justify-center bg-[#EB5757] rounded-full overflow-hidden">
          <img class="flex w-full h-full object-cover" src="{{ asset('/images/reviewers/' . $review['avatar']) }}" width="50" height="50" alt="{{ $review['name'] }}">
        </span>
        <div>
          <h3 class="font-semibold text-base">{{ $review['name'] }}</h3>
        </div>
      </div>
      <div class="text-[#FAC816] flex items-center gap-x-1">
        @foreach (range(1, 5) as $rate)
          <svg width="14" height="20">
            <use xlink:href="#star" />
          </svg>
        @endforeach
      </div>
    </header>
    <div class="relative max-h-[150px] overflow-hidden transition-all duration-150" data-sizable="150">
      <h3>{{ $review['comment-title'] }}</h3>
      <p>{{ $review['comment'] }}</p>
      <div class="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-white to-transparent pointer-events-none transition-all duration-150 group-[.shown]:opacity-0"></div>
    </div>
  </div>
</article>
