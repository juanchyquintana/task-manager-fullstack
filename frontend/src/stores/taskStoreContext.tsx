import { createContext } from "react"
import { TaskStore, taskStore } from "./taskStore"

interface StoresContextValue {
    taskStore: TaskStore
}

const StoresTaskContext = createContext<StoresContextValue>({
    taskStore
});

const StoresTaskProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <StoresTaskContext.Provider value={{ taskStore }}>
            {children}
        </StoresTaskContext.Provider>
    );
};

export {
    StoresTaskContext,
    StoresTaskProvider
}

