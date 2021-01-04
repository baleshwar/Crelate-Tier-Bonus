// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

var crelateJob = {
  Priorities: "AA",
  "Argentina Referral Bonus Tier": "junior"
};

const prioritiesUS: Array<String> = ["AA", "AB", "AC"];
const prioritiesArgentina: Array<String> = ["BAA", "BAB", "BAC"];
const prioritiesIN: Array<String> = ["IA", "IB", "IC"];

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
  !crelateJob["Priorities"] &&
  (compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId)
) {
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId:
      compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        ? compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        : null
  });
} else if (
  crelateJob &&
  crelateJob["Priorities"] &&
  prioritiesUS.includes(crelateJob["Priorities"]) &&
  (compDTO &&
    compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId &&
    compDTO["NWSdlrATSConfig"].ATSBonusBuilder.name
      .toLowerCase()
      .includes("us") &&
    compDTO["NWSdlrATSConfig"].ATSBonusBuilder.name.toLowerCase.includes(
      crelateJob["Argentina Referral Bonus Tier"].toLowerCase()
    ))
) {
  DefaultBonus = JSON.stringify({
    hasBonus: true,
    tieredBonusId:
      compDTO && compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        ? compDTO["NWSdlrATSConfig"].cmp_defaultReferralBonusId
        : null
  });
}

console.log("heree", DefaultBonus);
