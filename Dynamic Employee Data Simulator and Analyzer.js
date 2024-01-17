const gender = ['male', 'female'];
const workload = [10, 20, 30, 40] 
const femaleFirstNames = [
    "Adriana", "Alena", "Alexandra", "Alice", "Amelia",
    "Barbora", "Blanka", "Dagmar", "Dominika", "Elena",
    "Eliška", "Emília", "Eva", "Gabriela", "Hana",
    "Helena", "Irena", "Jana", "Jaroslava", "Jarmila",
    "Kamila", "Karolína", "Katarína", "Klára", "Kristína",
    "Lenka", "Linda", "Lucia", "Ludmila", "Magdaléna",
    "Mária", "Marie", "Markéta", "Martina", "Michaela",
    "Monika", "Natalie", "Nela", "Nikola", "Olga",
    "Patrícia", "Petra", "Radka", "Renáta", "Simona",
    "Soňa", "Veronika", "Zuzana"
  ];
  const maleFirstNames = [
    "Adam", "Aleš", "Alexandr", "Alois", "Andrej",
    "Anton", "Bohumil", "Bohuslav", "Branislav", "David",
    "Dominik", "Dušan", "Emil", "Filip", "František",
    "Gabriel", "Jakub", "Ján", "Jaromír", "Jaroslav",
    "Jiří", "Josef", "Juraj", "Karel", "Karol",
    "Ladislav", "Lukáš", "Marek", "Martin", "Matúš",
    "Michal", "Milan", "Ondrej", "Patrik", "Pavel",
    "Peter", "Radim", "Radek", "Richard", "Robert",
    "Roman", "Šimon", "Stanislav", "Tomáš", "Václav",
    "Viktor", "Vladimír", "Zdeněk"
  ];
const femaleSurnames = [
    "Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková",
    "Kučerová", "Marešová", "Šimková", "Havlová", "Lišková",
    "Králová", "Němcová", "Pospíšilová", "Machová", "Říhová",
    "Benešová", "Horáková", "Konečná", "Malá", "Tomášová",
    "Kolářová", "Fialová", "Veselá", "Urbanová", "Zemanová",
    "Kovaříková", "Holubová", "Štěpánová", "Vlčková", "Křížová",
    "Káňová", "Hrušková", "Novotná", "Dubová", "Kočová",
    "Richterová", "Sýkorová", "Petrášová", "Žáková", "Kudláčková",
    "Jelínková", "Vojtová", "Blažková", "Šťastná", "Mikulášová",
    "Moravcová", "Kratochvílová"
  ];
  const maleSurnames = [
    "Novák", "Svoboda", "Dvořák", "Černý", "Procházka",
    "Kučera", "Mareš", "Šimek", "Havel", "Liška",
    "Kráľ", "Němec", "Pospíšil", "Mach", "Říha",
    "Beneš", "Horák", "Konečný", "Malý", "Tomáš",
    "Kolář", "Fiala", "Veselý", "Urban", "Zeman",
    "Kovařík", "Holub", "Štěpánek", "Vlček", "Kříž",
    "Káňa", "Hruška", "Novotný", "Dub", "Koč",
    "Richter", "Sýkora", "Petráš", "Žák", "Kudláček",
    "Jelínek", "Vojta", "Blážek", "Šťastný", "Mikuláš",
    "Moravec", "Kratochvíl"
  ]; 

  const dtoIn
  = {
  count: 50,
  age: {
  min: 19,
  max: 35
  }
  };
  
  function getRandomBirthdate(minAge, maxAge) {
    const today = new Date();
    const minBirthdate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxBirthdate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  
    const randomBirthdate = new Date(
      minBirthdate.getTime() + Math.random() * (maxBirthdate.getTime() - minBirthdate.getTime())
    );
  
    return randomBirthdate;
  }

function generateEmployeeData(dtoIn) {
  const dtoOut = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const randomGender = gender[Math.floor(Math.random() * gender.length)];
    const randomWorkload = workload[Math.floor(Math.random() * workload.length)];
  
    let firstName, lastName;
  
    if (randomGender === "male") {
      firstName = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
      lastName = maleSurnames[Math.floor(Math.random() * maleSurnames.length)];
    } else {
      firstName = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
      lastName = femaleSurnames[Math.floor(Math.random() * femaleSurnames.length)];
    }
  
    const randomBirthdate = getRandomBirthdate(dtoIn.age.min, dtoIn.age.max);

    const employee = {
      gender: randomGender,
      birthdate: randomBirthdate,
      name: firstName,
      surname: lastName,
      workload: randomWorkload
     };

     dtoOut.push(employee);

      dtoOut.push({
      gender: randomGender,
      birthdate: randomBirthdate.toISOString(),
      name: firstName,
      surname: lastName,
      workload: randomWorkload
      });
  }
  return dtoOut;
}

// Function to calculate the most frequent names
function calculateNameFrequencies(employees) {
    let nameFrequencies = {
      all: {},
      male: {},
      female: {},
      femalePartTime: {},
      maleFullTime: {}
    };
  
    employees.forEach(employee => {
      let categories = ['all'];
      if (employee.gender === 'male') {
        categories.push('male');
        if (employee.workload === 40) categories.push('maleFullTime');
      } else {
        categories.push('female');
        if (employee.workload < 40) categories.push('femalePartTime');
      }
  
      categories.forEach(category => {
        nameFrequencies[category][employee.name] = (nameFrequencies[category][employee.name] || 0) + 1;
      });
    });
  
    return nameFrequencies;
  }
  
  function convertToChartData(nameFrequencies) {
    let chartData = {};
  
    // Helper function to get top N entries
    const getTopNEntries = (entries, n) => {
      return entries.sort((a, b) => b[1] - a[1]).slice(0, n).map(entry => ({
        label: entry[0],
        value: entry[1]
      }));
    };
  
    // Special handling for 'all' category: 3 most frequent male and female names
    const topMale = getTopNEntries(Object.entries(nameFrequencies['male']), 3);
    const topFemale = getTopNEntries(Object.entries(nameFrequencies['female']), 3);
    chartData['all'] = topMale.concat(topFemale).sort((a, b) => b.value - a.value);

    // Process each category with specific limits
    chartData['male'] = getTopNEntries(Object.entries(nameFrequencies['male']), 3);
    chartData['female'] = getTopNEntries(Object.entries(nameFrequencies['female']), 3);
    chartData['femalePartTime'] = getTopNEntries(Object.entries(nameFrequencies['femalePartTime']), 2);
    chartData['maleFullTime'] = getTopNEntries(Object.entries(nameFrequencies['maleFullTime']), 2);
  
    return chartData;
  }
  
// Main function
function main(dtoIn) {
    const generatedData = generateEmployeeData(dtoIn);
    const namesDictionary = { names: { all: {}, male: {}, female: {}, femalePartTime: {}, maleFullTime: {} } };
  
    generatedData.forEach(({ name, gender, workload }) => {
      namesDictionary.names.all[name] = (namesDictionary.names.all[name] || 0) + 1;
  
      if (gender === 'female') {
        namesDictionary.names.female[name] = (namesDictionary.names.female[name] || 0) + 1;
        if ([10, 20, 30].includes(workload)) {
          namesDictionary.names.femalePartTime[name] = (namesDictionary.names.femalePartTime[name] || 0) + 1;
        }
      } else if (gender === 'male') {
        namesDictionary.names.male[name] = (namesDictionary.names.male[name] || 0) + 1;
        if (workload === 40) {
          namesDictionary.names.maleFullTime[name] = (namesDictionary.names.maleFullTime[name] || 0) + 1;
        }
      }
    });
     // Filter the top N names in each category.
    const names = {
      all: getHighestValues(namesDictionary.names.all, 6),
      male: getHighestValues(namesDictionary.names.male, 3),
      female: getHighestValues(namesDictionary.names.female, 3),
      femalePartTime: getHighestValues(namesDictionary.names.femalePartTime, 2),
      maleFullTime: getHighestValues(namesDictionary.names.maleFullTime, 2)
    };
  
    const chartData = Object.fromEntries(Object.entries(names).map(([key, value]) => [key, convertToChartData(value)]));
  
    return { names, chartData };
  }
  // Function to get the top N highest values from a dictionary.
  function getHighestValues(dictionary, n) {
    return Object.fromEntries(
      Object.entries(dictionary).sort((a, b) => b[1] - a[1]).slice(0, n)
    );
  }
  
  function convertToChartData(dictionary) {
    return Object.entries(dictionary)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }
  
  console.log(JSON.stringify(main(dtoIn), null, 2));
  