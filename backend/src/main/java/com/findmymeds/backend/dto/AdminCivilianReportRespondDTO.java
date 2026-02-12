package com.findmymeds.backend.dto;

import lombok.Data;

@Data
public class AdminCivilianReportRespondDTO {
    private String message;
    private String attachmentPath;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAttachmentPath() {
        return attachmentPath;
    }

    public void setAttachmentPath(String attachmentPath) {
        this.attachmentPath = attachmentPath;
    }
}
