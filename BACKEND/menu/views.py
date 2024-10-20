from io import BytesIO

from Tools.scripts.make_ctype import method
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Menu, Food
from .serializers import MenuSerializer
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
from reportlab.lib import colors
from django.http import FileResponse


def generate_menu_pdf():
    buffer = BytesIO()

    # Create the PDF object, using BytesIO as the file-like object.
    pdf = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    # Example data for the menu
    data = [
        ['Item', 'Price'],
        ['Caesar Salad', '$5.99'],
        ['Bruschetta', '$4.99'],
        ['Pizza', '$12.50'],
        ['Pasta', '$9.99']
    ]

    # Create a table for the menu
    table = Table(data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))

    # Add table to elements list
    elements.append(table)

    # Build the PDF
    pdf.build(elements)

    # Get the value of the BytesIO buffer and write it to a response.
    buffer.seek(0)
    return buffer


class MenuPDFView(APIView):
    def get(self, request, pk):
        # Get menu
        try:
            menu = Menu.objects.get(id=pk)
        except Menu.DoesNotExist:
            return Response({'error': 'Menu not found'}, status=404)

        categories = []
        for category in menu.category.all():
            categories.append(category.name)
        print(categories)



        # Generate the PDF
        pdf_buffer = generate_menu_pdf()

        # Return the PDF as a file response
        response = FileResponse(pdf_buffer, as_attachment=True, filename=f'{menu.title}.pdf')
        return response


class MenuHomeListApiView(generics.ListAPIView):
    queryset = Menu.objects.all()[:3]
    serializer_class = MenuSerializer


class MenuListApiView(generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
