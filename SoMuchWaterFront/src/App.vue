<template>
  <header class="bg-blue-800 h-36 flex justify-end items-center flex-col space-y-2 pb-2">
    <div>
      <h1 class="text-5xl font-semibold text-center text-blue-400">SoMuchWater</h1>
    </div>
    <nav class="space-x-2 text-blue-300">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/form">Form</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
