import { HorseRacingEventDocument, HorseRacingEventModel } from "../db/simulatorEvent.schema";
import { IHorseRacingEvent } from "../types/simulator.type";
import { NewEntity } from "../utility/common.type";

const convertHorseRacingEventDocumentToObject = (document: HorseRacingEventDocument) =>
    document.toObject({
        getters: true,
    }) as IHorseRacingEvent;

const save = async (simulatorEvent: NewEntity<IHorseRacingEvent>):
    Promise<IHorseRacingEvent> => {
    const newSimulatorModel = new HorseRacingEventModel(simulatorEvent);
    await newSimulatorModel.save();
    return convertHorseRacingEventDocumentToObject(newSimulatorModel);
}

const databaseRepository = {
    save
};

export default databaseRepository;