<template>
  <div class="container mx-auto p-4">
    <div class="fixed left-0 w-full h-full bg-white z-60 flex items-center justify-center transition-all ease-in-out duration-500" :class="isLoading ? 'top-0' : ' -top-full'">
      <LoadingComponent v-if="isLoading" />
    </div>
    <div v-if="!isLoading" class="flex gap-x-10 flex-wrap justify-center">
      <div v-for="(kelas, classKey) in dataClass" :key="classKey" class="my-4 p-5 rounded-lg bg-gradient-to-br from-primary to-[#1a202c] shadow-xl relative w-full">
        <RoundedAnimationComponent />
        <span class="animate-ping absolute top-0 right-0 h-2 w-2 rounded-full bg-secondary"></span>
        <h2 class="text-lg font-semibold mb-2 text-white">Data {{ classKey }}</h2>
        <div class="w-full flex flex-col md:flex-row gap-y-5 md:gap-x-5">
          <CardComponent>
            Jumlah Siswa {{ classKey }} <CircularNumberComponent>{{ kelas.student.length }}</CircularNumberComponent>
          </CardComponent>

          <CardComponent>
            Jumlah Siswa Menikah <CircularNumberComponent>{{ kelas.married.length }}</CircularNumberComponent>
          </CardComponent>

          <CardComponent>
            Siswa Meninggal Tahun Ini <CircularNumberComponent>{{ kelas.deathOnThisYear.length }}</CircularNumberComponent>
          </CardComponent>

          <CardComponent>
            Siswa Meninggal Tahun Depan <CircularNumberComponent>{{ kelas.deathOnNextYear.length }}</CircularNumberComponent>
          </CardComponent>
        </div>
        <div class="flex flex-col gap-y-5 p-3 mt-10">
          <ListStudentComponent v-if="kelas.married.length" :data="kelas.married" title="Siswa Menikah Tahun Ini" />
          <ListStudentComponent v-if="kelas.deathOnThisYear.length" :data="kelas.deathOnThisYear" title="Siswa Meninggal Tahun Ini" />
          <ListStudentComponent v-if="kelas.deathOnNextYear.length" :data="kelas.deathOnNextYear" title="Siswa Meninggal Tahun Depan" />
        </div>
        <StickComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from "vue";
import axiosInstance from "@/utils/axiosInstance";

import LoadingComponent from "../Animations/LoadingComponent.vue";
import RoundedAnimationComponent from "../Animations/RoundedAnimationComponent.vue";
import CardComponent from "../Cards/CardComponent.vue";
import CircularNumberComponent from "../Properties/CircularNumberComponent.vue";
import ListStudentComponent from "./ListStudentComponent.vue";
import StickComponent from "../Properties/StickComponent.vue"

const isLoading = ref(true);
const dataClass = {
  "Kelas A": { student: [], married: [], deathOnThisYear: [], deathOnNextYear: [] },
  "Kelas B": { student: [], married: [], deathOnThisYear: [], deathOnNextYear: [] },
  "Kelas C": { student: [], married: [], deathOnThisYear: [], deathOnNextYear: [] },
  "Kelas D": { student: [], married: [], deathOnThisYear: [], deathOnNextYear: [] },
  "Kelas E": { student: [], married: [], deathOnThisYear: [], deathOnNextYear: [] },
  "Kelas Khusus": { student: [], married: [], deathOnThisYear: [], deathOnNextYear: [] },
};

onMounted(() => {
  getData()
});

const isPrima = (number) => {
  if (number <= 1) return false;
  if (number <= 3) return true;

  if (number % 2 === 0 || number % 3 === 0) return false;

  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
};

const getData = async () => {
  try {
    const response = await axiosInstance.get("/TestBEIT");
    const { listNama: listName, listNilai : listScore } = response.data;

    for (let i = 0; i < listName.length; i++) {
      const student = listName[i];
      const score = listScore[i];
      const classKey = student.includes("C") && student.includes("O") ? "Kelas Khusus" : `Kelas ${score >= 80 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : score >= 30 ? "D" : "E"}`;

      dataClass[classKey].student.push({ name: student, score });

      if (score % 7 === 0) {
        dataClass[classKey].married.push({ name: student, score });
      }

      if (isPrima(score)) {
        const today = new Date();
        const month = today.getMonth() + 1;
        const studentScore = score % 10;

        if (month === studentScore) {
          dataClass[classKey].deathOnThisYear.push({ name: student, score });
        }

        if (month > studentScore) {
          dataClass[classKey].deathOnNextYear.push({ name: student, score });
        }
      }
    }

    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    isLoading.value = false;
  }
};
</script>
