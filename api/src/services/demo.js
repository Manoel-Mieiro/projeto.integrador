import demoRepo from "../repository/demo.js";
import time from "./time.js";

async function FindAllDemo() {
  try {
    return await demoRepo.FindAllDemo();
  } catch (error) {
    console.log("Error in demo:", error);
    throw error;
  }
}

async function FindOneDemo(id) {
  try {
    return await demoRepo.FindOneDemo(id);
  } catch (error) {
    console.log("Error in demo:", error);
    throw error;
  }
}

async function CreateDemo(data) {
  try {
    data.lastAccessed = time.lastAccess(data.lastAccessed);
    console.log("Creating demo:", data);
    await demoRepo.CreateDemo(data);
  } catch (error) {
    console.log("Error in CreateDemo:", error);
    throw error;
  }
}

export default { FindAllDemo, FindOneDemo, CreateDemo };
