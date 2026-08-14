import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { slugify } from "../lib/slugify";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_SEED_PASSWORD must be set (see .env).");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: "Administration CCIGA",
      roles: JSON.stringify(["ADMIN"]),
    },
  });

  console.log(`Admin user created: ${email} (id ${user.id})`);
}

const initialPrograms = [
  {
    slug: "licence-informatique",
    school: "universite",
    faculty: "Faculté des Sciences et Technologies",
    name: "Licence en Informatique",
    level: "Licence",
    duration: "4 ans",
    description:
      "Formation complète en développement logiciel, réseaux, bases de données et gestion de projets informatiques.",
    admissionConditions: [
      "Diplôme de fin d'études secondaires (Bac ou équivalent)",
      "Relevé de notes des trois dernières années",
      "Test d'admission en mathématiques et logique",
    ],
  },
  {
    slug: "licence-gestion",
    school: "universite",
    faculty: "Faculté des Sciences Économiques et de Gestion",
    name: "Licence en Sciences de Gestion",
    level: "Licence",
    duration: "4 ans",
    description:
      "Formation en gestion d'entreprise, comptabilité, marketing et entrepreneuriat.",
    admissionConditions: [
      "Diplôme de fin d'études secondaires (Bac ou équivalent)",
      "Relevé de notes des trois dernières années",
      "Entretien de motivation",
    ],
  },
  {
    slug: "genie-civil",
    school: "universite",
    faculty: "Faculté d'Ingénierie",
    name: "Licence en Génie Civil",
    level: "Licence",
    duration: "5 ans",
    description:
      "Formation d'ingénieurs capables de concevoir, planifier et superviser des projets de construction et d'infrastructure.",
    admissionConditions: [
      "Diplôme de fin d'études secondaires (Bac ou équivalent)",
      "Bon niveau en mathématiques et physique",
      "Test d'admission technique",
    ],
  },
  {
    slug: "technicien-reseaux",
    school: "ecole-professionnelle",
    faculty: "Filière Technologies de l'Information",
    name: "Technicien en Réseaux Informatiques",
    level: "Certificat professionnel",
    duration: "1 an",
    description:
      "Formation pratique en installation, configuration et maintenance de réseaux informatiques et systèmes.",
    admissionConditions: [
      "Diplôme de fin d'études secondaires ou équivalent",
      "Entretien d'admission",
    ],
  },
  {
    slug: "assistant-comptable",
    school: "ecole-professionnelle",
    faculty: "Filière Gestion et Finance",
    name: "Assistant Comptable",
    level: "Certificat professionnel",
    duration: "9 mois",
    description:
      "Formation pratique en comptabilité générale, fiscalité de base et outils de gestion financière.",
    admissionConditions: [
      "Diplôme de fin d'études secondaires ou équivalent",
      "Entretien d'admission",
    ],
  },
  {
    slug: "secondaire-general",
    school: "ecole-classique",
    faculty: "Cycle Secondaire",
    name: "Cursus Secondaire Général",
    level: "Secondaire (NS1–NS4)",
    duration: "4 ans",
    description:
      "Programme académique complet préparant les élèves aux examens officiels et à la poursuite d'études supérieures.",
    admissionConditions: [
      "Bulletin scolaire de l'année précédente",
      "Test de positionnement (français, mathématiques)",
      "Entretien avec la famille",
    ],
  },
];

async function seedPrograms() {
  const count = await prisma.program.count();
  if (count > 0) {
    console.log(`Programs already seeded (${count} found).`);
    return;
  }

  for (const program of initialPrograms) {
    await prisma.program.create({
      data: {
        ...program,
        admissionConditions: JSON.stringify(program.admissionConditions),
      },
    });
  }

  console.log(`Seeded ${initialPrograms.length} programs.`);
}

const initialNews = [
  {
    slug: "ouverture-inscriptions-2026",
    title: "Ouverture des inscriptions pour l'année académique 2026-2027",
    date: new Date("2026-08-01"),
    excerpt:
      "Les inscriptions pour l'École Classique, l'École Professionnelle et l'Université sont désormais ouvertes.",
    content:
      "Le CCIGA annonce l'ouverture officielle des inscriptions pour l'année académique 2026-2027. Les candidats intéressés par l'École Classique, l'École Professionnelle ou l'Université peuvent désormais soumettre leur dossier via le portail d'admission en ligne. Consultez la page Admission pour connaître les conditions et les délais.",
    category: "Admissions",
  },
  {
    slug: "nouveau-programme-genie-civil",
    title: "Lancement du programme de Licence en Génie Civil",
    date: new Date("2026-06-15"),
    excerpt:
      "La Faculté d'Ingénierie accueille un nouveau programme de licence en génie civil dès la prochaine rentrée.",
    content:
      "Dans le cadre de son développement académique, le CCIGA lance un nouveau programme de Licence en Génie Civil au sein de la Faculté d'Ingénierie. Ce programme de 5 ans formera des ingénieurs capables de répondre aux besoins croissants en infrastructure du pays.",
    category: "Programmes",
  },
  {
    slug: "journee-portes-ouvertes",
    title: "Journée portes ouvertes du CCIGA",
    date: new Date("2026-05-20"),
    excerpt:
      "Venez découvrir nos campus, rencontrer nos enseignants et échanger avec nos étudiants.",
    content:
      "Le CCIGA organise une journée portes ouvertes permettant aux futurs candidats et à leurs familles de visiter les installations, rencontrer le corps professoral et obtenir toutes les informations nécessaires sur les programmes offerts.",
    category: "Événements",
  },
];

async function seedNews() {
  const count = await prisma.news.count();
  if (count > 0) {
    console.log(`News already seeded (${count} found).`);
    return;
  }
  for (const item of initialNews) {
    await prisma.news.create({ data: item });
  }
  console.log(`Seeded ${initialNews.length} news items.`);
}

const initialEvents = [
  {
    slug: "rentree-academique-2026",
    title: "Rentrée académique 2026-2027",
    date: new Date("2026-09-08"),
    location: "Campus principal du CCIGA",
    description: "Début officiel des cours pour l'École Classique, l'École Professionnelle et l'Université.",
  },
  {
    slug: "journee-portes-ouvertes-2026",
    title: "Journée portes ouvertes",
    date: new Date("2026-08-20"),
    location: "Campus principal du CCIGA",
    description: "Visite des installations et rencontre avec les enseignants et le personnel administratif.",
  },
  {
    slug: "ceremonie-graduation-2026",
    title: "Cérémonie de graduation",
    date: new Date("2026-07-10"),
    location: "Auditorium du CCIGA",
    description: "Remise des diplômes aux finissants de l'Université et de l'École Professionnelle.",
  },
];

async function seedEvents() {
  const count = await prisma.event.count();
  if (count > 0) {
    console.log(`Events already seeded (${count} found).`);
    return;
  }
  for (const item of initialEvents) {
    await prisma.event.create({ data: item });
  }
  console.log(`Seeded ${initialEvents.length} events.`);
}

const initialFaq = [
  {
    question: "Comment puis-je m'inscrire au CCIGA ?",
    answer:
      "Vous pouvez soumettre votre candidature en ligne via le bouton « Candidater / S'inscrire » présent sur le site. Vous choisirez l'entité (École Classique, École Professionnelle ou Université), puis le programme souhaité.",
  },
  {
    question: "Quels documents sont nécessaires pour candidater ?",
    answer:
      "Les documents demandés varient selon le programme, mais incluent généralement une pièce d'identité, le dernier diplôme ou bulletin obtenu, et des photos d'identité. La liste précise est indiquée à chaque étape du formulaire de candidature.",
  },
  {
    question: "Quels sont les frais de scolarité ?",
    answer:
      "Les frais varient selon l'entité et le programme choisi. Vous trouverez le détail sur la page Admission, section Frais.",
  },
  {
    question: "Puis-je suivre l'état de ma candidature ?",
    answer:
      "Une fois la plateforme de gestion du CCIGA déployée, chaque candidat pourra suivre l'état de son dossier depuis son portail personnel. En attendant, l'administration vous contactera directement après soumission.",
  },
  {
    question: "Comment contacter l'administration ?",
    answer:
      "Vous pouvez utiliser le formulaire de la page Contact ou les coordonnées indiquées en bas de chaque page du site.",
  },
];

async function seedFaq() {
  const count = await prisma.faq.count();
  if (count > 0) {
    console.log(`FAQ already seeded (${count} found).`);
    return;
  }
  for (let i = 0; i < initialFaq.length; i++) {
    await prisma.faq.create({ data: { ...initialFaq[i], order: i } });
  }
  console.log(`Seeded ${initialFaq.length} FAQ items.`);
}

type Niveau = "prescolaire" | "primaire" | "secondaire";
type TeacherModel = "titulaire" | "matiere";

interface ClasseEcoleClassique {
  slug: string;
  niveau: Niveau;
  teacherModel: TeacherModel;
  faculty: string;
  name: string;
  level: string;
  duration: string;
  description: string;
  admissionConditions: string[];
  tuitionFee: number;
}

const prescolaireConditions = [
  "Acte de naissance de l'enfant",
  "Certificat médical",
  "Photos d'identité récentes",
];
const primaireConditions = [
  "Bulletin scolaire de l'année précédente",
  "Certificat médical",
  "Photos d'identité récentes",
];
const secondaireConditions = [
  "Bulletin scolaire de l'année précédente",
  "Test de positionnement (français, mathématiques)",
  "Entretien avec la famille",
];

const ecoleClassiqueNiveaux: ClasseEcoleClassique[] = [
  // Préscolaire
  {
    slug: "prescolaire-petite-section",
    niveau: "prescolaire",
    teacherModel: "titulaire",
    faculty: "Cycle Préscolaire",
    name: "Petite Section",
    level: "Préscolaire",
    duration: "1 an",
    description: "Premier niveau du préscolaire — éveil, socialisation et découverte.",
    admissionConditions: prescolaireConditions,
    tuitionFee: 15000,
  },
  {
    slug: "prescolaire-moyenne-section",
    niveau: "prescolaire",
    teacherModel: "titulaire",
    faculty: "Cycle Préscolaire",
    name: "Moyenne Section",
    level: "Préscolaire",
    duration: "1 an",
    description: "Deuxième niveau du préscolaire — développement du langage et de la motricité.",
    admissionConditions: prescolaireConditions,
    tuitionFee: 15000,
  },
  {
    slug: "prescolaire-grande-section",
    niveau: "prescolaire",
    teacherModel: "titulaire",
    faculty: "Cycle Préscolaire",
    name: "Grande Section",
    level: "Préscolaire",
    duration: "1 an",
    description: "Dernier niveau du préscolaire — préparation à l'entrée au primaire.",
    admissionConditions: prescolaireConditions,
    tuitionFee: 15000,
  },
  // Primaire / École fondamentale (1re AF à 9e AF) — titulaire jusqu'à 6e AF, matière ensuite
  ...["1re", "2e", "3e", "4e", "5e", "6e", "7e", "8e", "9e"].map(
    (ordinal, i): ClasseEcoleClassique => ({
      slug: `primaire-${slugify(ordinal)}-af`,
      niveau: "primaire",
      teacherModel: i < 6 ? "titulaire" : "matiere",
      faculty: "Cycle Primaire",
      name: `${ordinal} AF`,
      level: "Primaire / École fondamentale",
      duration: "1 an",
      description: `${ordinal} Année Fondamentale — cycle primaire du CCIGA.`,
      admissionConditions: primaireConditions,
      tuitionFee: 20000 + i * 500,
    }),
  ),
  // Secondaire (en complément du programme catch-all existant "secondaire-general")
  ...["NS1", "NS2", "NS3", "NS4"].map(
    (ns): ClasseEcoleClassique => ({
      slug: `secondaire-${ns.toLowerCase()}`,
      niveau: "secondaire",
      teacherModel: "matiere",
      faculty: "Cycle Secondaire",
      name: ns,
      level: "Secondaire",
      duration: "1 an",
      description: `${ns} — cycle secondaire du CCIGA, préparation aux examens officiels.`,
      admissionConditions: secondaireConditions,
      tuitionFee: 25000,
    }),
  ),
];

async function seedEcoleClassiqueNiveaux() {
  let created = 0;
  let backfilled = 0;
  for (const classe of ecoleClassiqueNiveaux) {
    const existing = await prisma.program.findUnique({ where: { slug: classe.slug } });
    if (existing) {
      if (!existing.teacherModel) {
        await prisma.program.update({
          where: { id: existing.id },
          data: { teacherModel: classe.teacherModel },
        });
        backfilled += 1;
      }
      continue;
    }
    await prisma.program.create({
      data: {
        slug: classe.slug,
        school: "ecole-classique",
        faculty: classe.faculty,
        name: classe.name,
        level: classe.level,
        niveau: classe.niveau,
        teacherModel: classe.teacherModel,
        duration: classe.duration,
        description: classe.description,
        admissionConditions: JSON.stringify(classe.admissionConditions),
        tuitionFee: classe.tuitionFee,
      },
    });
    created += 1;
  }
  if (created > 0) {
    console.log(`Seeded ${created} École Classique niveau/classe programs.`);
  } else {
    console.log("École Classique niveau/classe programs already seeded.");
  }
  if (backfilled > 0) {
    console.log(`Backfilled teacherModel on ${backfilled} existing classe programs.`);
  }
}

interface TestDemoStudent {
  email: string;
  name: string;
  programSlug: string;
  courseName: string;
}

const testDemoStudents: TestDemoStudent[] = [
  {
    email: "test.prescolaire@cciga.edu",
    name: "TEST Élève Préscolaire",
    programSlug: "prescolaire-petite-section",
    courseName: "TEST Cours — Éveil et découverte",
  },
  {
    email: "test.primaire@cciga.edu",
    name: "TEST Élève Primaire",
    programSlug: "primaire-5e-af",
    courseName: "TEST Cours — Mathématiques",
  },
  {
    email: "test.secondaire@cciga.edu",
    name: "TEST Élève Secondaire",
    programSlug: "secondaire-ns2",
    courseName: "TEST Cours — Sciences",
  },
];

async function seedTestNiveauDemoData() {
  let created = 0;
  for (const demo of testDemoStudents) {
    const existing = await prisma.user.findUnique({ where: { email: demo.email } });
    if (existing) continue;

    const program = await prisma.program.findUnique({ where: { slug: demo.programSlug } });
    if (!program) continue;

    const passwordHash = await bcrypt.hash("TEST-demo-2026", 10);
    const student = await prisma.user.create({
      data: {
        email: demo.email,
        passwordHash,
        name: demo.name,
        roles: JSON.stringify(["STUDENT"]),
        programId: program.id,
      },
    });

    const course = await prisma.course.create({
      data: {
        programId: program.id,
        name: demo.courseName,
        description: "Cours de démonstration (données TEST) pour ce niveau.",
        dayOfWeek: 1,
        startTime: "08:00",
        endTime: "09:00",
      },
    });

    await prisma.grade.create({
      data: {
        studentId: student.id,
        courseId: course.id,
        score: 85,
        comment: "TEST — note de démonstration.",
      },
    });

    await prisma.attendance.create({
      data: {
        courseId: course.id,
        studentId: student.id,
        date: new Date(),
        status: "present",
      },
    });

    created += 1;
  }
  if (created > 0) {
    console.log(`Seeded ${created} TEST demo students (one per new niveau).`);
  } else {
    console.log("TEST demo niveau data already seeded.");
  }
}

async function seedTestTitulaireDemo() {
  const email = "test.titulaire@cciga.edu";
  const program = await prisma.program.findUnique({ where: { slug: "prescolaire-petite-section" } });
  if (!program) return;

  let teacher = await prisma.user.findUnique({ where: { email } });
  if (!teacher) {
    const passwordHash = await bcrypt.hash("TEST-demo-2026", 10);
    teacher = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: "TEST Titulaire Préscolaire",
        roles: JSON.stringify(["TEACHER"]),
      },
    });
    console.log("Seeded 1 TEST titulaire teacher.");
  }

  if (program.titulaireId !== teacher.id) {
    await prisma.program.update({ where: { id: program.id }, data: { titulaireId: teacher.id } });
    await prisma.course.updateMany({ where: { programId: program.id }, data: { teacherId: teacher.id } });
    console.log(`Assigned TEST titulaire to ${program.name}.`);
  }
}

interface UniversiteProgramSeed {
  slug: string;
  facultyName: string;
  name: string;
  programType: "licence" | "diplome";
  duration: string;
}

const universiteFaculties = [
  "Faculté des Sciences de la Santé",
  "Faculté d'Agronomie et de l'Environnement",
  "Faculté de Génie et des Technologies",
  "Faculté des Sciences Juridiques et Politiques",
  "Faculté des Sciences Économiques, Administratives et de Gestion",
  "Faculté de Communication et de Journalisme",
  "Faculté des Sciences de l'Éducation",
  "Sciences de la Santé",
  "Administration, Langues et Douane",
];

const universiteConditions = [
  "Diplôme de fin d'études secondaires (Bac ou équivalent)",
  "Relevé de notes des trois dernières années",
  "Entretien d'admission",
];

// Programmes communiqués par CCIGA. La validation juridique définitive de chaque
// intitulé, niveau et durée doit être effectuée à partir des actes officiels
// délivrés par le MENFP/DESRS — voir programStatus "brouillon" ci-dessous.
const universitePrograms: UniversiteProgramSeed[] = [
  { slug: "licence-medecine", facultyName: "Faculté des Sciences de la Santé", name: "Médecine", programType: "licence", duration: "4 ans" },
  { slug: "licence-odontologie", facultyName: "Faculté des Sciences de la Santé", name: "Odontologie", programType: "licence", duration: "4 ans" },
  { slug: "licence-sciences-infirmieres", facultyName: "Faculté des Sciences de la Santé", name: "Sciences infirmières", programType: "licence", duration: "4 ans" },
  { slug: "licence-agronomie", facultyName: "Faculté d'Agronomie et de l'Environnement", name: "Agronomie", programType: "licence", duration: "4 ans" },
  // "genie-civil" already exists from the original seed — handled separately in seedUniversiteStructure().
  { slug: "licence-droit", facultyName: "Faculté des Sciences Juridiques et Politiques", name: "Sciences juridiques (Droit)", programType: "licence", duration: "4 ans" },
  { slug: "licence-sciences-administratives", facultyName: "Faculté des Sciences Économiques, Administratives et de Gestion", name: "Sciences administratives", programType: "licence", duration: "4 ans" },
  { slug: "licence-sciences-comptables", facultyName: "Faculté des Sciences Économiques, Administratives et de Gestion", name: "Sciences comptables", programType: "licence", duration: "4 ans" },
  { slug: "licence-gestion-des-affaires", facultyName: "Faculté des Sciences Économiques, Administratives et de Gestion", name: "Gestion des affaires", programType: "licence", duration: "4 ans" },
  { slug: "licence-sciences-economiques", facultyName: "Faculté des Sciences Économiques, Administratives et de Gestion", name: "Sciences économiques", programType: "licence", duration: "4 ans" },
  { slug: "licence-communication-journalisme", facultyName: "Faculté de Communication et de Journalisme", name: "Communication sociale et Journalisme", programType: "licence", duration: "4 ans" },
  { slug: "licence-sciences-education", facultyName: "Faculté des Sciences de l'Éducation", name: "Sciences de l'éducation", programType: "licence", duration: "4 ans" },
  { slug: "diplome-laboratoire-medical", facultyName: "Sciences de la Santé", name: "Laboratoire médical", programType: "diplome", duration: "2 ans" },
  { slug: "diplome-pharmacologie", facultyName: "Sciences de la Santé", name: "Pharmacologie", programType: "diplome", duration: "2 ans" },
  { slug: "diplome-physiotherapie", facultyName: "Sciences de la Santé", name: "Physiothérapie", programType: "diplome", duration: "2 ans" },
  { slug: "diplome-secretariat-trilingue", facultyName: "Administration, Langues et Douane", name: "Secrétariat trilingue", programType: "diplome", duration: "2 ans" },
  { slug: "diplome-assistance-administrative", facultyName: "Administration, Langues et Douane", name: "Assistance administrative", programType: "diplome", duration: "2 ans" },
  { slug: "diplome-technique-douaniere", facultyName: "Administration, Langues et Douane", name: "Technique douanière", programType: "diplome", duration: "2 ans" },
];

async function seedUniversiteStructure() {
  let facultiesCreated = 0;
  const facultyIdByName = new Map<string, string>();
  for (const name of universiteFaculties) {
    const existing = await prisma.faculty.findUnique({ where: { school_name: { school: "universite", name } } });
    if (existing) {
      facultyIdByName.set(name, existing.id);
      continue;
    }
    const created = await prisma.faculty.create({ data: { school: "universite", name } });
    facultyIdByName.set(name, created.id);
    facultiesCreated += 1;
  }
  if (facultiesCreated > 0) {
    console.log(`Seeded ${facultiesCreated} université faculties/domaines.`);
  } else {
    console.log("Université faculties/domaines already seeded.");
  }

  // Fold the pre-existing "Génie Civil" program into the new mandated structure
  // instead of duplicating it — preserves its history (slug, students, courses).
  const genieCivil = await prisma.program.findUnique({ where: { slug: "genie-civil" } });
  if (genieCivil && !genieCivil.programType) {
    await prisma.program.update({
      where: { id: genieCivil.id },
      data: {
        faculty: "Faculté de Génie et des Technologies",
        academicFacultyId: facultyIdByName.get("Faculté de Génie et des Technologies"),
        programType: "licence",
        programStatus: "brouillon",
        level: "Licence",
      },
    });
    console.log("Génie Civil rattaché à la nouvelle structure (Faculté de Génie et des Technologies).");
  }

  // The two pre-existing programs that are NOT part of the mandated list are
  // archived (never deleted) — preserves history while ensuring CCIGA never
  // publicly advertises a programme outside the confirmed structure.
  for (const slug of ["licence-informatique", "licence-gestion"]) {
    const existing = await prisma.program.findUnique({ where: { slug } });
    if (existing && existing.programStatus !== "archive") {
      await prisma.program.update({ where: { id: existing.id }, data: { programStatus: "archive" } });
      console.log(`Archivé (hors structure mandatée, historique conservé) : ${existing.name}.`);
    }
  }

  let programsCreated = 0;
  for (const p of universitePrograms) {
    const existing = await prisma.program.findUnique({ where: { slug: p.slug } });
    if (existing) continue;

    await prisma.program.create({
      data: {
        slug: p.slug,
        school: "universite",
        faculty: p.facultyName,
        academicFacultyId: facultyIdByName.get(p.facultyName),
        name: p.name,
        level: p.programType === "licence" ? "Licence" : "Diplôme",
        programType: p.programType,
        programStatus: "brouillon",
        duration: p.duration,
        description: `${p.name} — ${p.programType === "licence" ? "programme de licence" : "programme de diplôme"} de la ${p.facultyName}. Fiche en cours de complétion par l'administration (statut brouillon).`,
        admissionConditions: JSON.stringify(universiteConditions),
        tuitionFee: 0,
      },
    });
    programsCreated += 1;
  }
  if (programsCreated > 0) {
    console.log(`Seeded ${programsCreated} programmes universitaires (licence + diplôme).`);
  } else {
    console.log("Programmes universitaires (licence + diplôme) déjà seedés.");
  }
}

interface EcoleProfessionnelleProgramSeed {
  slug: string;
  faculty: string;
  name: string;
  description: string;
  skillsTargeted: string[];
}

const ecoleProfessionnelleConditions = [
  "Avoir au moins 15 ans",
  "Savoir lire et écrire",
  "Entretien d'admission",
];

// Les 12 filières prioritaires communiquées par CCIGA. Aucune durée officielle
// n'est fixée tant que la référence INFP réelle n'est pas enregistrée — voir
// programStatus "brouillon" ci-dessous, et lib/universiteValidation.ts qui
// interdit tout statut "autorise" sans référence + justificatif.
const ecoleProfessionnelleProgramsSeed: EcoleProfessionnelleProgramSeed[] = [
  {
    slug: "coupe-et-confection",
    faculty: "Filière Métiers de Service",
    name: "Coupe et Confection",
    description: "Formation professionnelle en couture : prise de mesures, patronage, confection et réparation de vêtements.",
    skillsTargeted: ["Prise de mesures et patronage", "Techniques de couture et de confection", "Réparation et retouche de vêtements"],
  },
  {
    slug: "informatique-bureautique",
    faculty: "Filière Métiers Administratifs et Numériques",
    name: "Informatique Bureautique",
    description: "Formation pratique aux outils bureautiques : Windows, Word, Excel, PowerPoint, Internet, saisie et gestion de documents.",
    skillsTargeted: ["Maîtrise de Windows et des outils Microsoft Office", "Saisie et mise en forme de documents", "Recherche et gestion de l'information sur Internet"],
  },
  {
    slug: "electricite-batiment",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Électricité Bâtiment",
    description: "Formation en installations électriques domestiques : câblage, entretien et sécurité.",
    skillsTargeted: ["Câblage et installations électriques domestiques", "Entretien et dépannage", "Normes de sécurité électrique"],
  },
  {
    slug: "plomberie-installations-sanitaires",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Plomberie et Installations Sanitaires",
    description: "Formation en tuyauterie, drainage, sanitaires, alimentation et évacuation d'eau.",
    skillsTargeted: ["Installation de tuyauterie et de sanitaires", "Systèmes de drainage et d'évacuation", "Alimentation en eau et entretien"],
  },
  {
    slug: "cuisine-et-patisserie",
    faculty: "Filière Métiers de Service",
    name: "Cuisine et Pâtisserie",
    description: "Formation en préparation des aliments, pâtisserie, hygiène et service de restauration.",
    skillsTargeted: ["Techniques culinaires et de pâtisserie", "Hygiène et sécurité alimentaire", "Service et présentation en restauration"],
  },
  {
    slug: "mecanique-automobile",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Mécanique Automobile",
    description: "Formation en diagnostic, entretien courant et réparation des véhicules.",
    skillsTargeted: ["Diagnostic mécanique", "Entretien courant des véhicules", "Réparation des systèmes automobiles"],
  },
  {
    slug: "refrigeration-climatisation",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Réfrigération et Climatisation",
    description: "Formation en installation, entretien et réparation des équipements frigorifiques.",
    skillsTargeted: ["Installation d'équipements frigorifiques", "Entretien et dépannage", "Réparation des systèmes de climatisation"],
  },
  {
    slug: "secretariat-assistance-administrative",
    faculty: "Filière Métiers Administratifs et Numériques",
    name: "Secrétariat et Assistance Administrative",
    description: "Formation en accueil, correspondance, classement, archives et gestion de bureau.",
    skillsTargeted: ["Accueil et communication professionnelle", "Rédaction de correspondance", "Classement, archives et gestion de bureau"],
  },
  {
    slug: "comptabilite-informatisee",
    faculty: "Filière Métiers Administratifs et Numériques",
    name: "Comptabilité Informatisée",
    description: "Formation en caisse, facturation, opérations comptables, rapports et logiciels de gestion.",
    skillsTargeted: ["Gestion de caisse et facturation", "Opérations comptables courantes", "Utilisation de logiciels de comptabilité"],
  },
  {
    slug: "maconnerie-construction-batiment",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Maçonnerie et Construction Bâtiment",
    description: "Formation en fondations, murs, béton, finitions et sécurité sur chantier.",
    skillsTargeted: ["Réalisation de fondations et de murs", "Techniques de bétonnage et de finition", "Sécurité sur chantier"],
  },
  {
    slug: "menuiserie-et-ebenisterie",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Menuiserie et Ébénisterie",
    description: "Formation en fabrication et réparation de portes, fenêtres, meubles et ouvrages en bois.",
    skillsTargeted: ["Fabrication d'ouvrages en bois", "Réparation de meubles et menuiseries", "Finitions et assemblage"],
  },
  {
    slug: "soudure-construction-metallique",
    faculty: "Filière Métiers Techniques et Industriels",
    name: "Soudure et Construction Métallique",
    description: "Formation en soudage, découpe, assemblage et fabrication de structures métalliques.",
    skillsTargeted: ["Techniques de soudage et de découpe", "Assemblage de structures métalliques", "Sécurité en atelier de soudure"],
  },
];

async function seedEcoleProfessionnelleStructure() {
  // The two pre-existing programs that are NOT part of the 12 mandated
  // filières are archived (never deleted) — preserves history while ensuring
  // CCIGA never publicly advertises a filière outside the confirmed list.
  for (const slug of ["technicien-reseaux", "assistant-comptable"]) {
    const existing = await prisma.program.findUnique({ where: { slug } });
    if (existing && existing.programStatus !== "archive") {
      await prisma.program.update({ where: { id: existing.id }, data: { programStatus: "archive" } });
      console.log(`Archivé (hors liste des 12 filières prioritaires, historique conservé) : ${existing.name}.`);
    }
  }

  let created = 0;
  for (const p of ecoleProfessionnelleProgramsSeed) {
    const existing = await prisma.program.findUnique({ where: { slug: p.slug } });
    if (existing) continue;

    await prisma.program.create({
      data: {
        slug: p.slug,
        school: "ecole-professionnelle",
        faculty: p.faculty,
        name: p.name,
        level: "Certificat professionnel",
        programStatus: "brouillon",
        skillsTargeted: JSON.stringify(p.skillsTargeted),
        practicalWork: "Ateliers pratiques encadrés tout au long de la formation.",
        internship: "Stage pratique en entreprise ou atelier partenaire (modalités à confirmer).",
        certification: "Certificat CCIGA — reconnaissance officielle INFP en attente de validation.",
        duration: "Durée à déterminer (validation INFP en attente)",
        description: p.description,
        admissionConditions: JSON.stringify(ecoleProfessionnelleConditions),
        tuitionFee: 0,
      },
    });
    created += 1;
  }
  if (created > 0) {
    console.log(`Seeded ${created} filières École Professionnelle (statut brouillon).`);
  } else {
    console.log("Filières École Professionnelle déjà seedées.");
  }
}

async function main() {
  await seedAdmin();
  await seedPrograms();
  await seedNews();
  await seedEvents();
  await seedFaq();
  await seedEcoleClassiqueNiveaux();
  await seedTestNiveauDemoData();
  await seedTestTitulaireDemo();
  await seedUniversiteStructure();
  await seedEcoleProfessionnelleStructure();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
