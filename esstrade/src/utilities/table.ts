import Table from "cli-table";

export function CreateTable(head: string[], rows: any[]): Table {
    var table = new Table({
        head: head,

    });
    rows.forEach(row => {
        table.push(row);
    });

    return table;
}