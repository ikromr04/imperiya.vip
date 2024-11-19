<nav {{ $attributes->merge([
    'class' => 'flex',
]) }} id="navigation">
  <button class="flex items-center justify-center text-white p-1 -mr-1 lg:hidden" type="button" onclick="document.body.classList.add('overflow-hidden')">
    <span class="sr-only">{{ __('Меню') }}</span>
    <svg class="sm:w-8 sm:h-8" width="24" height="24">
      <use xlink:href="#menu" />
    </svg>
  </button>

  <div class="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-50 z-20 opacity-0 group-[.overflow-hidden]:opacity-100 group-[.overflow-hidden]:visible transition-all duration-300 invisible lg:hidden"></div>

  <ul class="fixed top-0 right-0 bg-white text-brand transition-all duration-300 font-semibold py-7 z-20 h-screen invisible opacity-0 translate-x-full group-[.overflow-hidden]:opacity-100 group-[.overflow-hidden]:visible group-[.overflow-hidden]:translate-x-0 lg:visible lg:static lg:opacity-100 lg:bg-transparent lg:py-0 lg:text-inherit lg:flex lg:w-auto lg:h-auto lg:translate-x-0">
    <li>
      <a class="flex items-center w-[80vw] max-w-[320px] px-6 py-1 border-b lg:w-auto lg:border-b-0 lg:px-4 transition-all duration-300 rounded hover:bg-black hover:bg-opacity-10" href="#about" onclick="document.body.classList.remove('overflow-hidden')">
        {{ __('О нас') }}
      </a>
    </li>
    <li>
      <a class="flex items-center w-[80vw] max-w-[320px] px-6 py-1 border-b lg:w-auto lg:border-b-0 lg:px-4 transition-all duration-300 rounded hover:bg-black hover:bg-opacity-10" href="#facts" onclick="document.body.classList.remove('overflow-hidden')">
        {{ __('Факты') }}
      </a>
    </li>
    <li>
      <a class="flex items-center w-[80vw] max-w-[320px] px-6 py-1 border-b lg:w-auto lg:border-b-0 lg:px-4 transition-all duration-300 rounded hover:bg-black hover:bg-opacity-10" href="#team" onclick="document.body.classList.remove('overflow-hidden')">
        {{ __('Команда') }}
      </a>
    </li>
    <li>
      <a class="flex items-center w-[80vw] max-w-[320px] px-6 py-1 border-b lg:w-auto lg:border-b-0 lg:px-4 transition-all duration-300 rounded hover:bg-black hover:bg-opacity-10" href="#gallery" onclick="document.body.classList.remove('overflow-hidden')">
        {{ __('Фотогалерея') }}
      </a>
    </li>
    <li>
      <a class="flex items-center w-[80vw] max-w-[320px] px-6 py-1 lg:w-auto lg:px-4 transition-all duration-300 rounded hover:bg-black hover:bg-opacity-10" href="#values" onclick="document.body.classList.remove('overflow-hidden')">
        {{ __('Ценности') }}
      </a>
    </li>
  </ul>
</nav>
