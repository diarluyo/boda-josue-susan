 /* SUBIR ARCHIVOS */

    document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://subir-archivos-lv42.onrender.com/upload";

    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("statusMessage");
    const progressContainer = document.getElementById("progressContainer");
    const progressBar = document.getElementById("progressBar");
    const fileName = document.getElementById("fileName");
    const submitBtn = document.getElementById("boton-upload");

    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.6;
    submitBtn.style.cursor = "not-allowed";
    //ddetectamos cambios en el input para habilitar el botón
    fileInput.addEventListener("change",()=>{
      if(fileInput.files.length > 0){
        submitBtn.disabled = false;
        submitBtn.style.opacity = 1;
        submitBtn.style.cursor = "pointer";
      } else{
        submitBtn.disabled = true;
        submitBtn.style.opacity = 0.6;
        submitBtn.style.cursor = "not-allowed";
      }
    });


    if (!form) {
      console.error("No se encontró #uploadForm");
      return;
    }
    if (!progressBar) {
      console.warn("No se encontró #progressBar — creando uno temporal");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!fileInput.files || fileInput.files.length === 0) {
        status.textContent = "⚠️ Selecciona al menos un archivo.";
        return;
      }

      // calculamos total real de los archivos (fallback si e.total no está disponible)
      const totalBytes = Array.from(fileInput.files).reduce((sum, f) => sum + f.size, 0);
      console.log("Total bytes (calculado):", totalBytes);

      // Preparar UI
      status.textContent = "Subiendo archivos...";
      if (progressContainer) progressContainer.style.display = "block";
      if (progressBar) progressBar.style.width = "0%";

      const formData = new FormData();
      for (const file of fileInput.files) formData.append("files", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", API_URL, true);

      xhr.upload.onprogress = (event) => {
        // Depuración
        // console.log("progress event:", event);

        let percent = 0;

        if (event.lengthComputable && event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        } else if (totalBytes > 0) {
          // fallback: usar totalBytes calculado (approx)
          percent = Math.min(100, (event.loaded / totalBytes) * 100);
        } else {
          // si no hay forma de calcular, no actualizamos la barra
          percent = 0;
        }

        // Actualiza visual si existe
        if (progressBar) progressBar.style.width = `${Math.round(percent)}%`;

        // Opcional: mostrar % en texto
        status.textContent = `Subiendo... ${Math.round(percent)}%`;
      };

      xhr.onload = () => {
        const modal = document.getElementById("modalConfirm");
        const modalTitle = document.getElementById("modalTitle");
        const modalMessage = document.getElementById("modalMessage");
        const closeBtn = document.getElementById("modalClose");
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success && response.uploaded) {
              const names = response.uploaded.map(f => f.name).join(", ");
              modalTitle.textContent = "¡Archivos subidos con éxito!";
              modalMessage.innerHTML = `Se han subido ${response.uploaded.length} archivo(s): <br><b>${names}</b>`;
              /* status.innerHTML = `${response.uploaded.length} archivos subidos correctamente: <br><b>${names}</b>`; */
            } else {
              status.textContent = "Subida completada pero respuesta inesperada del servidor.";
              console.warn("Respuesta servidor:", xhr.responseText);
            }
          } catch (err) {
            status.textContent = "Subida completada (no JSON en respuesta).";
            console.warn("No JSON:", xhr.responseText);
          }
          if (progressBar) progressBar.style.width = "100%";
        } else {
          status.textContent = `Error del servidor: ${xhr.status}`;
          if (progressBar) progressBar.style.width = "0%";
          console.error("Error response:", xhr.status, xhr.responseText);
        }
        modal.style.display = "flex";

        closeBtn.onclick = () => {
          modal.style.display = "none";
          uploadForm.reset();
          progressBar.style.width = "0%";
          progressContainer.classList.add("hidden");
          status.textContent = "";
          submitBtn.disabled = true;
          submitBtn.style.opacity = 0.6;
          submitBtn.style.cursor = "not-allowed";
          fileName.textContent = "";
        }

       setTimeout(() => {
         // limpiar forma y UI
         uploadForm.reset();
         progressBar.style.width = "0%";
         progressContainer.classList.add("hidden");
         status.textContent = "";
         submitBtn.disabled = true;
         submitBtn.style.opacity = 0.6;
         submitBtn.style.cursor = "not-allowed";
         fileName.textContent = "";
       }, 2500);
      };

      xhr.onerror = () => {
        status.textContent = "Error de conexión al servidor.";
        if (progressBar) progressBar.style.width = "0%";
        console.error("XHR error");
      };

      xhr.send(formData);
  });
  /* PARA MOSTAR NOMBRES DE ARCHIVOS */
    
    fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        const files = Array.from(fileInput.files)
        .map(f => f.name)
        .join(", ");
        fileName.textContent = `${files}`;
    } else {
        fileName.textContent = "";
    }
    });


});


    
