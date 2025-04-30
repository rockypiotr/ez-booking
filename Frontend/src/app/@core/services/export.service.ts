import { Injectable } from '@angular/core';
import { Appointment } from './appointment.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(appointments: Appointment[], fileName: string = 'appointments'): void {
    // In a real application, this would use a library like exceljs, xlsx, or file-saver
    console.log('Exporting to Excel...', appointments);
    
    // Mock implementation - in production, use a proper Excel generation library
    const header = 'ID,Data,Status,Klient,Usługa,Pracownik,Czas (min),Cena (zł)\n';
    const csvData = appointments.map(app => {
      const date = new Date(app.date).toLocaleString('pl-PL');
      const status = this.getStatusLabel(app.status);
      return `${app.id},${date},${status},${app.clientName},${app.serviceName},${app.employeeName},${app.duration},${app.price}`;
    }).join('\n');
    
    const csvContent = header + csvData;
    this.downloadFile(csvContent, `${fileName}.csv`, 'text/csv');
  }

  exportToPDF(appointments: Appointment[], fileName: string = 'appointments'): void {
    // In a real application, this would use a library like pdfmake, jspdf, or html2pdf
    console.log('Exporting to PDF...', appointments);
    
    // Actual implementation would go here using a PDF generation library
    // This is just a placeholder for the functionality
    alert('Generowanie PDF zostało wywołane. W rzeczywistej aplikacji, dokument PDF zostałby utworzony i pobrany.');
  }
  
  private getStatusLabel(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Potwierdzona';
      case 'canceled':
        return 'Odwołana';
      case 'completed':
        return 'Wykonana';
      default:
        return status;
    }
  }
  
  private downloadFile(data: string, filename: string, mime: string): void {
    const blob = new Blob([data], { type: mime });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    
    // Trigger the download and clean up
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
} 