const courseLoad = async () => {
  try {
    const response = await fetch("https://api.minireg.thanayut.in.th/courses");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("ไม่มีข้อมูลภาควิชาหรือรายวิชา");
    }
    return data.courses;
  } catch (error) {
    console.log("เกิดข้อผิดพลาด");
  }
};

const main = async () => {
  const section = document.getElementById("course-list");
  const courseCard = (course) => {
    const { courseNo, abbrName, department, credit, genEdType, totalSeats } =
      course;
    return `<section class="course">
        <h3>${courseNo} ${abbrName}</h3>
        <h4>ภาควิชา</h4>
        <p>${department}</p>
<h4>หน่วยกิต</h4>
        <p>${credit}</p>
        <h4>ประเภทGenEd</h4>
        <p>${genEdType}</p>
        <h4>จำนวนที่นั่ง</h4>
        <p>${totalSeats}</p>
   </section>`;
  };
  const courses = await courseLoad();
  section.innerHTML = courses.map((course) => courseCard(course)).join("");
};
main();
