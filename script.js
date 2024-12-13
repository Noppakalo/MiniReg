// const courseLoad = async () => {
//   try {
//     const response = await fetch("https://api.minireg.thanayut.in.th/courses");
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("ไม่มีข้อมูลภาควิชาหรือรายวิชา");
//     }
//     return data.courses;
//   } catch (error) {
//     console.log("เกิดข้อผิดพลาด");
//   }
// };

// const main = async () => {
//   const section = document.getElementById("course-list");
//   const courseCard = (course) => {
//     const { courseNo, abbrName, department, credit, genEdType, totalSeats } =
//       course;
//     return `<section class="course">
//         <h3>${courseNo} ${abbrName}</h3>
//         <h4>ภาควิชา</h4>
//         <p>${department}</p>
// <h4>หน่วยกิต</h4>
//         <p>${credit}</p>
//         <h4>ประเภทGenEd</h4>
//         <p>${genEdType}</p>
//         <h4>จำนวนที่นั่ง</h4>
//         <p>${totalSeats}</p>
//    </section>`;
//   };
//   const courses = await courseLoad();

//   section.innerHTML = courses.map((course) => courseCard(course)).join("");
// };

// main();

const coursesInfo = (data) => {
  const { courseNo, abbrName, department, credit, totalSeats, genEdType } =
    data;
  return `<section class="course">
	<h3>${courseNo} ${abbrName}</h3>
	<h4>ภาควิชา/กลุ่มวิชา/สาขาวิชา</h4>
	<p>${department}/p>
	<h4>จำนวนหน่วยกิต</h4>
	<p>${credit} หน่วยกิต</p>
	<h4>จำนวนที่นั่ง</h4>
	<p>${totalSeats}</p>
	<h4>ประเภทGenEd</h4>
	<p>${genEdType}</p>
</section>`;
};

const main = async () => {
  // get course detail and fetch is called to get data from the API
  const result = await fetch("https://api.minireg.thanayut.in.th/courses")
    .then((response) => response.json())
    .catch((error) => error.json());

  // after the information has been received check if there are any errors or not. If there is an error in the console
  if (result?.error) {
    console.log(result?.error);
    return;
  }
  // If there are no errors reduce is used to loop through the html data for each course created by coursesInfo and insert it into #course-list in the html
  const coursesData = result?.courses.reduce((previous, current) => {
    previous += coursesInfo(current);
    return previous;
  }, "");

  const coursesList = document.getElementById("course-list");
  coursesList.innerHTML = coursesData;
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});
