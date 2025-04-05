import demoRepo from "../repository/demo.js";

async function FindAllDemo() {
    try {
        return await demoRepo.FindAllDemo();
    } catch (error) {
        console.log("Error in demo:", error);
        return;
    }
}

async function CreateDemo(data) {
    try {
        console.log("Creating demo:", data);
        await demoRepo.CreateDemo(data);
    } catch (error) {
        console.log("Error in CreateDemo:", error);
        return;
    }
}

export default { FindAllDemo, CreateDemo }