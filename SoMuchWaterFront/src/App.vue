<template>
  <header class="bg-blue-800 h-36 flex justify-center items-center">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/form">Form</RouterLink>
    </nav>
    <div>
      <h1 class="text-5xl font-semibold text-center text-blue-400">SoMuchWater</h1>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
