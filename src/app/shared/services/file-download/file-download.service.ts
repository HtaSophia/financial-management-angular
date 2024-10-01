import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { mkConfig, generateCsv, download } from 'export-to-csv';

type DataCSV = Record<string, string | number | boolean | undefined>;
type DataPDF = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class FileDownloadService {
    public downloadAsCsv(data: DataCSV[], filename: string): void {
        const csvConfig = mkConfig({ useKeysAsHeaders: true, filename });
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    }

    public downloadAsPdf(headers: string[], data: DataPDF[], filename: string): void {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
        doc.table(90, 100, data, headers, {
            autoSize: true,
            printHeaders: true,
            margins: 40,
        });
        doc.save(`${filename}.pdf`);
    }
}
