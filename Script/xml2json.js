const parser = require('xml2json');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://activiti.org/bpmn20">
  <message id="callBackUrl" name="åè°å°å"></message>
  <message id="notifyType" name="email"></message>
  <process id="SDFFFF" name="åå®æå®" isExecutable="true">
    <extensionElements>
      <activiti:executionListener event="end" class="com.datayes.workflow.activiti.listener.CallBackListener"></activiti:executionListener>
    </extensionElements>
    <startEvent id="thisStart" activiti:initiator="initiator" activiti:formKey="activiti/demo/vacation_view.html"></startEvent>
    <endEvent id="theEnd"></endEvent>
    <userTask id="Task_00ye0at" name="åå®æå®èç¹1">
      <extensionElements>
        <activiti:formProperty id="APPROVAL_RULE" name="ALL_APPROVAL" type="string"></activiti:formProperty>
        <activiti:formProperty id="APPROVAL_USER" type="enum">
          <activiti:value id="APPOINTED_USER" name="{&quot;parameter&quot;:[{&quot;userCode&quot;:&quot;10007@datayes.com&quot;,&quot;json&quot;:[{&quot;value&quot;:&quot;10007@datayes.com&quot;,&quot;label&quot;:&quot;ç¬¬10007ä¸ªç¨æ·&quot;,&quot;position&quot;:null,&quot;id&quot;:&quot;10007&quot;}]}]}"></activiti:value>
        </activiti:formProperty>
      </extensionElements>
    </userTask>
    <sequenceFlow id="SequenceFlow_1f3ycpx" sourceRef="thisStart" targetRef="Task_00ye0at"></sequenceFlow>
    <sequenceFlow id="SequenceFlow_10nzqcs" sourceRef="Task_00ye0at" targetRef="theEnd"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_SDFFFF">
    <bpmndi:BPMNPlane bpmnElement="SDFFFF" id="BPMNPlane_SDFFFF">
      <bpmndi:BPMNShape bpmnElement="thisStart" id="BPMNShape_thisStart">
        <omgdc:Bounds height="30.0" width="30.0" x="10.0" y="92.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="theEnd" id="BPMNShape_theEnd">
        <omgdc:Bounds height="30.0" width="30.0" x="400.0" y="92.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="Task_00ye0at" id="BPMNShape_Task_00ye0at">
        <omgdc:Bounds height="80.0" width="100.0" x="185.0" y="54.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="SequenceFlow_10nzqcs" id="BPMNEdge_SequenceFlow_10nzqcs">
        <omgdi:waypoint x="285.0" y="94.0"></omgdi:waypoint>
        <omgdi:waypoint x="343.0" y="94.0"></omgdi:waypoint>
        <omgdi:waypoint x="343.0" y="107.0"></omgdi:waypoint>
        <omgdi:waypoint x="400.0" y="107.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="SequenceFlow_1f3ycpx" id="BPMNEdge_SequenceFlow_1f3ycpx">
        <omgdi:waypoint x="40.0" y="107.0"></omgdi:waypoint>
        <omgdi:waypoint x="113.0" y="107.0"></omgdi:waypoint>
        <omgdi:waypoint x="113.0" y="94.0"></omgdi:waypoint>
        <omgdi:waypoint x="185.0" y="94.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;
const json = parser.toJson(xml);
console.log('to json -> %s', json);
