import demoRepo from "../repository/demo.js";

async function FindAllDemo() {
    try {
        return await demoRepo.FindAllDemo();
    } catch (error) {
        console.log("Error in demo:", error);
        return;
    }
}

export default { FindAllDemo }