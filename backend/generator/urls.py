# backend/generator/urls.py

from django.urls import path
from .views import (
    GenerateProposalView,
    GeneratePitchDeckView,
    DownloadProposalView,
    DownloadPitchDeckView,
    ProjectDetailView,
    ProjectListView
)

urlpatterns = [
    path('generate/proposal/', GenerateProposalView.as_view(), name='generate-proposal'),
    path('generate/pitchdeck/', GeneratePitchDeckView.as_view(), name='generate-pitchdeck'),
    path('generate/proposal/download/', DownloadProposalView.as_view(), name='download-proposal'),
    path('generate/pitchdeck/download/', DownloadPitchDeckView.as_view(), name='download-pitchdeck'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
]
