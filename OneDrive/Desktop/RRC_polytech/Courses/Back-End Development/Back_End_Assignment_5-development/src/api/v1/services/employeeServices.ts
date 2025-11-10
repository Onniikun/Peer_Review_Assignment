import { Employee } from "src/data/employees";
import { QuerySnapshot, DocumentData, DocumentSnapshot, } from "node_modules/firebase-admin/lib/firestore";
import { 
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByFieldValues
} from "../repositories/firestoreRepository";

const COLLECTION: string = "employees";

/**
 * Retrieves all employee data from Employee array.
 * @returns All employee data.
 */
export const getAllEmployeeData = async(): Promise<Employee[]> => {
    try{
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION)
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: Number(doc.id),
                name: data.name,
                position: data.position,
                department: data.department,
                email: data.email,
                phone: data.phone,
                branchId: data.branchId,
            } as Employee;
        });
        return structuredClone(employees)
    } catch (error: unknown) {
        throw error;
    }
}
/**
 * Gets only employee ID data.
 * @param id - The ID number we're retrieving.
 * @returns Employee ID number.
 */
export const getEmployeeId = async (id: number): Promise<Employee | undefined > => {

    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, String(id))
    if(!doc) {
        throw new Error(`Employee with ${id} cannot be retrieved.`)
    }
    const data: DocumentData | undefined = doc.data();
    if(!data) {
        throw new Error(`Employee with ${id} doesnt exist`)
    }
    return {
            id: Number(doc.id),
            name: data.name,
            position: data.position,
            department: data.department,
            email: data.email,
            phone: data.phone,
            branchId: data.branchId,
        }

};

/**
 * Creates a new employee data.
 * @param employeeData - Data for a new employee.
 * @returns creates a new employee with id based on the current id numbers.
 */
export const createEmployeeData = async(employeeData: {
    id: number;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: number;
    branchId: number;
}): Promise<Employee> => {
    const newEmployee: Employee = {
        id: employeeData.id,
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.email,
        phone: employeeData.phone,
        branchId: employeeData.branchId
    };
    const employeeId: string = await createDocument<Employee>(COLLECTION, newEmployee)
    return structuredClone({employeeId, ...newEmployee} as Employee);
}
/**
 * Updates an existing employee data.
 * @param id - The ID number of the employee to update.
 * @param employeeData - Employee data to update.
 * @returns The updated employee data.
 * @throws an error if employee ID doesnt exist.
 */
export const updateEmployeeData = async (
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId"> ):

    Promise<Employee> => {
        const employee: Employee | undefined = await getEmployeeId(id)

        if(!employee) {
            throw new Error(`Employee with ID ${id} not found`);
        }
        const updatedEmployee: Employee = {
        id,
        name: employeeData.name ?? employee.name,
        position: employeeData.position ?? employee.position,
        department: employeeData.department ?? employee.department,
        email: employeeData.email ?? employee.email,
        phone: employeeData.phone ?? employee.phone,
        branchId: employeeData.branchId ?? employee.branchId,
        }
        await updateDocument<Employee>(COLLECTION, String(id), updatedEmployee);
    
    return structuredClone(updatedEmployee);
};
/**
 * Deletes employee data from the employee array
 * @param id - The ID number of employee data to remove.
 * @returns returns false if the employee data wasnt removed, true if deleted.
 */
export const deleteEmployeeData = async(id: number): Promise<void> => {
    const employee: Employee | undefined = await getEmployeeId(id)
    if(!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }
    await deleteDocument(COLLECTION, String(id));
};
/**
 * Returns employee array based on a specified branch ID.
 * @param branchId 
 * @returns 
 */
export const getEmployeeByBranch = async(branchId: number): Promise<Employee[]> => {
    const snapshot: QuerySnapshot = await getDocumentsByFieldValues(COLLECTION, [{ fieldName: "branchId", fieldValue: branchId }]);
    const employees: Employee[] = snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: Number(doc.id),
            name: data.name,
            position: data.position,
            department: data.department,
            email: data.email,
            phone: data.phone,
            branchId: data.branchId,
        } as Employee;
    });
    return structuredClone(employees)
 }
/**
 * Return employee array based on a specified department.
 * @param department 
 * @returns 
 */
export const getEmployeeByDepartment = async(department: string): Promise<Employee[]> => {
    const snapshot: QuerySnapshot = await getDocumentsByFieldValues(COLLECTION, [{ fieldName: "department", fieldValue: department }]);
    const employees: Employee[] = snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: Number(doc.id),
            name: data.name,
            position: data.position,
            department: data.department,
            email: data.email,
            phone: data.phone,
            branchId: data.branchId,
        } as Employee;
    });
    return structuredClone(employees)
    }