# backend/generator/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from io import BytesIO

from .models import Project
from .serializers import ProjectSerializer
from .hf import generate_sections
from .utils import build_pdf, build_pptx


# -----------------------
# Generate Proposal
# -----------------------
class GenerateProposalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        template = data.get('template', 'classic')

        # Generate dynamic AI content
        project_title = data.get('company', 'Untitled Proposal')
        description = data.get('projectDescription', '')
        ai_content = generate_sections(project_title, description)

        project = Project.objects.create(
            user=request.user,
            title=project_title,
            type="proposal",
            form_data=data,
            ai_content=ai_content,
            template=template
        )

        return Response({
            "message": "Proposal generated successfully",
            "project_id": project.id,
            "data": ai_content,
            "template": template
        })


# -----------------------
# Generate Pitch Deck
# -----------------------
class GeneratePitchDeckView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        template = data.get('template', 'classic')

        # Generate dynamic AI content
        project_title = data.get('company', 'Untitled Pitch Deck')
        description = data.get('projectDescription', '')
        ai_content = generate_sections(project_title, description)

        project = Project.objects.create(
            user=request.user,
            title=project_title,
            type="pitch_deck",
            form_data=data,
            ai_content=ai_content,
            template=template
        )

        return Response({
            "message": "Pitch Deck generated successfully",
            "project_id": project.id,
            "data": ai_content,
            "template": template
        })


# -----------------------
# Project Detail
# -----------------------
class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk, user=request.user)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

        serializer = ProjectSerializer(project)
        data = serializer.data
        data['ai'] = project.ai_content
        data['template'] = project.template
        return Response(data)


# -----------------------
# Project List
# -----------------------
class ProjectListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.filter(user=request.user).order_by('-created_at')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


# -----------------------
# Download Proposal
# -----------------------
class DownloadProposalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        project_id = request.data.get("project_id")
        template = request.data.get("template", "classic")  # ✅ include template

        if not project_id:
            return Response({"error": "Project ID is required"}, status=400)

        try:
            project = Project.objects.get(id=project_id, user=request.user)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

        sections = project.ai_content
        if not sections:
            return Response({"error": "No content available for this project"}, status=400)

        buffer = BytesIO()
        build_pdf(sections, buffer, template=template)  # ✅ pass template
        buffer.seek(0)

        response = HttpResponse(buffer.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{project.title}_{template}_proposal.pdf"'
        return response


# -----------------------
# Download Pitch Deck
# -----------------------
class DownloadPitchDeckView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        project_id = request.data.get("project_id")
        template = request.data.get("template", "classic")  # ✅ include template

        if not project_id:
            return Response({"error": "Project ID is required"}, status=400)

        try:
            project = Project.objects.get(id=project_id, user=request.user)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

        sections = project.ai_content
        if not sections:
            return Response({"error": "No content available for this project"}, status=400)

        buffer = BytesIO()
        build_pptx(sections, buffer, template=template)  # ✅ pass template
        buffer.seek(0)

        response = HttpResponse(
            buffer.read(),
            content_type='application/vnd.openxmlformats-officedocument.presentationml.presentation'
        )
        response['Content-Disposition'] = f'attachment; filename="{project.title}_{template}_pitchdeck.pptx"'
        return response
