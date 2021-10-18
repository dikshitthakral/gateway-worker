import { SimulatorEventDocument, SimulatorEventModel } from "../db/simulatorEvent.schema";
import { ISimulatorEvent } from "../types/simulator.type";
import { NewEntity } from "../utility/common.type";

const convertSimulatorEventDocumentToObject = (document: SimulatorEventDocument) =>
    document.toObject({
        getters: true,
    }) as ISimulatorEvent;

const createSimulatorEvent = async (simulatorEvent: NewEntity<ISimulatorEvent>):
    Promise<ISimulatorEvent> => {
    const newSimulatorModel = new SimulatorEventModel(simulatorEvent);
    await newSimulatorModel.save();
    return convertSimulatorEventDocumentToObject(newSimulatorModel);
}

const SimulatorWorkerRepository = {
    createSimulatorEvent
};


export default SimulatorWorkerRepository;