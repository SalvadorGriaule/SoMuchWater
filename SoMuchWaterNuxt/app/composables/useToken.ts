import { useState } from "nuxt/app";

export const useToken = () => useState<string>('token')