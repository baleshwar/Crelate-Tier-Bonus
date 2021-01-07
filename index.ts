// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

var crelateJob = {
  Priorities: null,
  "Argentina Referral Bonus Tier": "junior"
};

var CrelateTierBonus = [
  {
    id: "69b8848a-a789-49fa-9793-96334aabc97e",
    companyId: "d0829b5c-c03d-45fc-9a0e-e58a3f0c75d3",
    name: "Bonus Build 3",
    archived: null,
    tiers: [
      {
        amount: "1000",
        recipientType: "employee",
        payOutDays: "5",
        userGroup: "3944e182-425e-11ea-b77f-2e728ce88125"
      },
      {
        amount: "1000",
        recipientType: "candidate",
        payOutDays: "30",
        userGroup: "3944e182-425e-11ea-b77f-2e728ce88125"
      }
    ],
    __typename: "TieredBonus"
  },
  {
    id: "69b8848a-a789-49fa-9793-96334aabc97e",
    companyId: "d0829b5c-c03d-45fc-9a0e-e58a3f0c75d3",
    name: "US Default",
    archived: null,
    tiers: [
      {
        amount: "1000",
        recipientType: "employee",
        payOutDays: "5",
        userGroup: "3944e182-425e-11ea-b77f-2e728ce88125"
      },
      {
        amount: "1000",
        recipientType: "candidate",
        payOutDays: "30",
        userGroup: "3944e182-425e-11ea-b77f-2e728ce88125"
      }
    ],
    __typename: "TieredBonus"
  }
];
const prioritiesUS: Array<String> = ["AA", "AB", "AC"];
const prioritiesArgentina: Array<String> = ["BAA", "BAB", "BAC"];
const prioritiesIN: Array<String> = ["IA", "IB", "IC"];
const tags = {
  Default: []
};

const atsConfig = [
  {
    ATSName: "Crelate",
    ATSHiringManager: {
      id: "ef9297fb-13f4-4b6d-a24d-0e2e2da45574",
      name: "ERIN Support"
    },
    ATSBonusBuilder: {
      tieredBonusId: "b7dc4d21-62bc-4acc-a830-20d1ef43187e",
      name: "basic"
    },
    ATSNotificationType: "NONE",
    ATSCreatedById: "ef9297fb-13f4-4b6d-a24d-0e2e2da45574",
    ATSAPIKey: "4pmb1dew64xqa7jrtkhkxz65bh",
    CustomerName: "resolvit"
  }
];
var compDTO: any[] = [];
compDTO["NWSdlrATSConfig"] = {
  cmp_defaultReferralBonusId: null,
  ATSBonusBuilder: null
};
compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId = atsConfig[0]
  .ATSBonusBuilder
  ? atsConfig[0].ATSBonusBuilder.tieredBonusId
  : null;

compDTO["NWSdlrATSConfig"].ATSBonusBuilder = atsConfig[0].ATSBonusBuilder
  ? atsConfig[0].ATSBonusBuilder
  : null;

let DefaultBonus = "";
if (
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesUS.includes(crelateJob["Priorities"]) &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  if (tags.Default.length < 2) {
    var bonusType = tags.Default[0].toLowerCase();
    const bonus = CrelateTierBonus.filter(
      e =>
        e.name.toLowerCase().includes("argentina") &&
        e.name.toLowerCase().includes("us") &&
        e.name.toLowerCase().includes(bonusType)
    )[0];
    DefaultBonus = JSON.stringify({
      hasBonus: true,
      tieredBonusId: bonus ? bonus.id : null
    });
  } else {
    DefaultBonus = JSON.stringify({
      hasBonus: true,
      tieredBonusId: 0
    });
  }
} else if (
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesArgentina.includes(crelateJob["Priorities"]) &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  if (tags.Default.length < 2) {
    var bonusType = tags.Default[0].toLowerCase();
    const bonus = CrelateTierBonus.filter(
      e =>
        e.name.toLowerCase().includes("argentina") &&
        !e.name.toLowerCase().includes("us") &&
        e.name.toLowerCase().includes(bonusType)
    )[0];
    DefaultBonus = JSON.stringify({
      hasBonus: true,
      tieredBonusId: bonus ? bonus.id : null
    });
  } else {
    DefaultBonus = JSON.stringify({
      hasBonus: true,
      tieredBonusId: 0
    });
  }
} else if (
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesIN.includes(crelateJob["Priorities"]) &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  const bonus = CrelateTierBonus.filter(e =>
    e.name.toLowerCase().includes("india")
  )[0];
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId: bonus ? bonus.id : null
  });
} else if (
  !crelateJob["Priorities"] ||
  !(prioritiesUS.includes(
    crelateJob["Priorities"] ||
    prioritiesArgentina.includes(crelateJob["Priorities"]) ||
    prioritiesIN.includes(crelateJob["Priorities"])
  ))
) {
  const bonus = CrelateTierBonus.filter(
    e =>
      e.name.toLowerCase().includes("us") &&
      e.name.toLowerCase().includes("default")
  )[0];
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId: bonus ? bonus.id : null
  });
} else if (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId) {
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId:
      compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        ? compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        : null
  });
} else if (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralAmount) {
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    amount:
      compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralAmount
        ? compDTO["NWSdlrATSConfig"].cmp_defaultReferralAmount
        : null
  });
}

console.log("heree", DefaultBonus);
