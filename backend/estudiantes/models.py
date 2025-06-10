from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    semestre = models.CharField(max_length=20)  
    estudia = models.BooleanField(default=True)  # Campo booleano para saber si el estudiante está estudiando

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.semestre})"

