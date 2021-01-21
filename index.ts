// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

var crelateJob = {
  Priorities: "A",
  "Argentina Referral Bonus Tier": "junior"
};

var CrelateTierBonus = [
  {
    companyId: "95790c4b-8cd6-4f86-aba2-e02f113ae4f7",
    id: "066fe203-6c39-481c-9b3f-29ee0825c6b5",
    name: "Argentina-Argentina Junior",
    tiers: [
      {
        amount: 750,
        payOutDays: 30,
        recipientType: "employee",
        userGroup: "52c14d5d-6a25-4401-a238-2e0369ecdd9c"
      }
    ]
  },
  {
    companyId: "95790c4b-8cd6-4f86-aba2-e02f113ae4f7",
    id: "160108da-4866-427a-9b25-f69eb4d74081",
    name: "US Standard",
    tiers: [
      {
        amount: 3000,
        payOutDays: 90,
        recipientType: "employee",
        userGroup: "52c14d5d-6a25-4401-a238-2e0369ecdd9c"
      }
    ]
  }
];
const prioritiesUS: Array<String> = ["AA", "AB", "AC"];
const prioritiesArgentina: Array<String> = ["BAA", "BAB", "BAC"];
const prioritiesIN: Array<String> = ["IA", "IB", "IC"];
const tags = {
  Default: [],
  "Argentina Referral Bonus Tier ": ["Argentina Junior "]
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
/**
 * Bonus setting for Argentina-US
 */
if (
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesUS.includes(crelateJob["Priorities"]) &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  console.log("Argentina-US");
  /**
   * Bonus setting for Junior/Senior
   */
  if (tags["Argentina Referral Bonus Tier "].length < 2) {
    var bonusType = tags["Argentina Referral Bonus Tier "][0]
      .toLowerCase()
      .trim();
    console.log("bonusType====>", bonusType);
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
  /**
   * Bonus setting for Argentina-Argentina
   */
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesArgentina.includes(crelateJob["Priorities"]) &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  console.log("Argentina-Argentina");
  /**
   * Bonus setting for Junior/Senior
   */
  if (tags["Argentina Referral Bonus Tier "].length < 2) {
    var bonusType = tags["Argentina Referral Bonus Tier "][0]
      .toLowerCase()
      .trim();
    console.log("bonusType====>", bonusType);
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
  /**
   * Bonus setting for India
   */
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesIN.includes(crelateJob["Priorities"]) &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  console.log("India");
  const bonus = CrelateTierBonus.filter(e =>
    e.name.toLowerCase().includes("india")
  )[0];
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId: bonus ? bonus.id : null
  });
} else if (
  /**
   * Bonus setting for US default
   */
  !crelateJob["Priorities"] ||
  !(
    prioritiesUS.includes(crelateJob["Priorities"]) ||
    prioritiesArgentina.includes(crelateJob["Priorities"]) ||
    prioritiesIN.includes(crelateJob["Priorities"])
  )
) {
  console.log("US Default");
  const bonus = CrelateTierBonus.filter(
    e =>
      e.name.toLowerCase().includes("us") &&
      e.name.toLowerCase().includes("standard")
  )[0];
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId: bonus ? bonus.id : null
  });
} else if (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId) {
  /**
   * Bonus setting for ATS
   */
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId:
      compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        ? compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        : null
  });
} else if (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralAmount) {
  /**
   * Bonus setting from Amount
   */
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    amount:
      compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralAmount
        ? compDTO["NWSdlrATSConfig"].cmp_defaultReferralAmount
        : null
  });
}
console.log("Bonus>>>", DefaultBonus);

