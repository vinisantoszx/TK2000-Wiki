"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookOpen,
  GitBranch,
  AlertTriangle,
  HelpCircle,
  Check,
  Clock,
  FileText,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Wrench,
} from "lucide-react";
import {
  trailDays,
  crmFlows,
  troubleshootingItems,
  faqItems,
} from "@/src/data/wikiData";

type ActiveModule = "trilhas" | "fluxos" | "erros" | "faq";

export default function TK2000WikiPage() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("trilhas");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("Todos");

  useEffect(() => {
    const savedDays = localStorage.getItem("tk2000_completed_days");
    const savedChecks = localStorage.getItem("tk2000_checked_items");
    if (savedDays) setCompletedDays(JSON.parse(savedDays));
    if (savedChecks) setCheckedItems(JSON.parse(savedChecks));
  }, []);

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("tk2000_checked_items", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleDayCompletion = (day: number) => {
    setCompletedDays((prev) => {
      const updated = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      localStorage.setItem("tk2000_completed_days", JSON.stringify(updated));
      return updated;
    });
  };

  const currentDayData = useMemo(
    () => trailDays.find((d) => d.day === selectedDay) || trailDays[0],
    [selectedDay]
  );

  const progressPercentage = Math.round((completedDays.length / 15) * 100);
  const nextPendingDay =
    trailDays.find((d) => !completedDays.includes(d.day)) || trailDays[14];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const trails = trailDays.filter(
      (d) =>
        d.fullTitle.toLowerCase().includes(q) ||
        d.shortTitle.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
    const flows = crmFlows.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.steps.some((s) => s.toLowerCase().includes(q))
    );
    const errors = troubleshootingItems.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.symptom.toLowerCase().includes(q) ||
        e.rootCause.toLowerCase().includes(q)
    );
    const faqs = faqItems.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );

    return { trails, flows, errors, faqs };
  }, [searchQuery]);

  const filteredTroubleshooting = useMemo(() => {
    if (selectedModuleFilter === "Todos") return troubleshootingItems;
    return troubleshootingItems.filter((item) => item.module === selectedModuleFilter);
  }, [selectedModuleFilter]);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] text-white font-bold flex items-center justify-center text-sm tracking-tight shadow-sm">
            TK
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm leading-tight">
              TK2000
            </h1>
            <p className="text-xs text-slate-400">Suporte Wiki</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar na wiki..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 flex-1 overflow-y-auto pb-6">
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Navegação
          </p>

          {/* Módulo 1: Trilhas de Aprendizagem */}
          <div className="mb-1">
            <button
              onClick={() => {
                setActiveModule("trilhas");
                setSearchQuery("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeModule === "trilhas" && !searchQuery
                  ? "bg-blue-50 text-[#1D4ED8]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Trilhas de Aprendizagem</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                15 dias
              </span>
            </button>

            {activeModule === "trilhas" && !searchQuery && (
              <div className="mt-1 ml-4 pl-2 border-l border-slate-200 space-y-0.5">
                {trailDays.slice(0, 10).map((item) => {
                  const isSelected = selectedDay === item.day;
                  const isDone = completedDays.includes(item.day);
                  return (
                    <button
                      key={item.day}
                      onClick={() => setSelectedDay(item.day)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-blue-50/80 text-[#1D4ED8] font-medium"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span className="truncate">
                        Dia {item.day}: {item.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Módulo 2: Passo a Passo (Fluxos CRM) */}
          <button
            onClick={() => {
              setActiveModule("fluxos");
              setSearchQuery("");
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-1 ${
              activeModule === "fluxos" && !searchQuery
                ? "bg-blue-50 text-[#1D4ED8]"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <GitBranch className="w-4 h-4 shrink-0" />
            <span>Passo a Passo (Fluxos CRM)</span>
          </button>

          {/* Módulo 3: Erros Comuns (Troubleshooting) */}
          <button
            onClick={() => {
              setActiveModule("erros");
              setSearchQuery("");
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-1 ${
              activeModule === "erros" && !searchQuery
                ? "bg-blue-50 text-[#1D4ED8]"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Erros Comuns (Troubleshooting)</span>
          </button>

          {/* Módulo 4: FAQ */}
          <button
            onClick={() => {
              setActiveModule("faq");
              setSearchQuery("");
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === "faq" && !searchQuery
                ? "bg-blue-50 text-[#1D4ED8]"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>FAQ (Dúvidas Frequentes)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Global Search Results View */}
          {searchResults ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E3A8A]">
                  Resultados da pesquisa por &ldquo;{searchQuery}&rdquo;
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Clique em qualquer item abaixo para abrir o conteúdo correspondente.
                </p>
              </div>

              {searchResults.trails.length === 0 &&
                searchResults.flows.length === 0 &&
                searchResults.errors.length === 0 &&
                searchResults.faqs.length === 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                    <p className="text-sm text-slate-600 font-medium">
                      Nenhum artigo encontrado para este termo.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Os termos sem resultado são revisados mensalmente pela Gerência de Suporte para criação de novos guias.
                    </p>
                  </div>
                )}

              {searchResults.trails.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-semibold uppercase text-slate-400">
                    Trilhas de Aprendizagem
                  </h3>
                  {searchResults.trails.map((t) => (
                    <button
                      key={t.day}
                      onClick={() => {
                        setActiveModule("trilhas");
                        setSelectedDay(t.day);
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {t.fullTitle}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {t.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {searchResults.errors.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-semibold uppercase text-slate-400">
                    Erros Comuns (Troubleshooting)
                  </h3>
                  {searchResults.errors.map((err) => (
                    <button
                      key={err.id}
                      onClick={() => {
                        setActiveModule("erros");
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                          {err.module}
                        </span>
                        <p className="text-sm font-semibold text-slate-800 mt-1">
                          {err.title}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {searchResults.faqs.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-semibold uppercase text-slate-400">
                    FAQ — Dúvidas Frequentes
                  </h3>
                  {searchResults.faqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => {
                        setActiveModule("faq");
                        setOpenFaqId(faq.id);
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <p className="text-sm font-medium text-slate-800">
                        {faq.question}
                      </p>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* MÓDULO 1: TRILHAS DE APRENDIZAGEM */}
              {activeModule === "trilhas" && (
                <div className="space-y-6">
                  {/* Breadcrumb & Header */}
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Trilhas de Aprendizagem / Dia {currentDayData.day}:{" "}
                      {currentDayData.shortTitle}
                    </p>
                    <h2 className="text-2xl font-bold text-[#1E3A8A]">
                      Bem-vindo ao Onboarding, Analista!
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                      Aqui você encontra a teoria de apoio para o treinamento
                      prático. Consulte a wiki antes de chamar o suporte técnico.
                    </p>
                  </div>

                  {/* Progress Card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold text-slate-700">
                        Progresso da Trilha de 15 Dias
                      </h3>
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8]">
                        Dia {selectedDay} de 15
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1D4ED8] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-medium w-8 text-right">
                        {progressPercentage}%
                      </span>
                    </div>

                    {/* Day Selector Buttons 1..15 */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {trailDays.map((d) => {
                        const isDone = completedDays.includes(d.day);
                        const isCurrent = selectedDay === d.day;
                        return (
                          <button
                            key={d.day}
                            onClick={() => setSelectedDay(d.day)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center border transition-all ${
                              isDone
                                ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                                : isCurrent
                                ? "bg-blue-50 text-[#1D4ED8] border-[#1D4ED8]"
                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                            }`}
                            title={`Dia ${d.day}: ${d.shortTitle}`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5" /> : d.day}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-slate-400">
                      {completedDays.length} artigos concluídos · Próximo: Dia{" "}
                      {nextPendingDay.day}: {nextPendingDay.shortTitle}
                    </p>
                  </div>

                  {/* Active Day Content Card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] font-medium">
                          {currentDayData.tag}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {currentDayData.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {currentDayData.type}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleDayCompletion(currentDayData.day)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                          completedDays.includes(currentDayData.day)
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {completedDays.includes(currentDayData.day)
                          ? "✓ Dia Concluído"
                          : "Marcar dia como concluído"}
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1E3A8A]">
                        {currentDayData.fullTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {currentDayData.description}
                      </p>
                    </div>

                    {/* Tip Box */}
                    <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg px-4 py-3 text-xs text-slate-700">
                      <strong className="font-semibold text-slate-900">
                        Dica:
                      </strong>{" "}
                      {currentDayData.tip.replace(/^Dica:\s*/i, "")}
                    </div>

                    {/* Interactive Checklist */}
                    <div className="space-y-2.5 pt-1">
                      {currentDayData.checklist.map((item) => {
                        const checked = !!checkedItems[item.id];
                        return (
                          <label
                            key={item.id}
                            onClick={() => toggleCheckItem(item.id)}
                            className={`flex items-center gap-3 p-3.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                              checked
                                ? "bg-blue-50/30 border-blue-200 text-slate-400 line-through"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded border-slate-300 text-[#1D4ED8] focus:ring-blue-500"
                            />
                            <span>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* MÓDULO 2: PASSO A PASSO — FLUXOS DO CRM */}
              {activeModule === "fluxos" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E3A8A]">
                      Passo a Passo — Fluxos do CRM
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Guias visuais dos principais fluxos do sistema.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {crmFlows.map((flow) => (
                      <div
                        key={flow.id}
                        className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs"
                      >
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">
                          {flow.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2.5">
                          {flow.steps.map((step, idx) => (
                            <React.Fragment key={step}>
                              <div className="flex items-center gap-2 bg-blue-50/80 border border-blue-100 px-3.5 py-2 rounded-lg">
                                <span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-medium text-slate-700">
                                  {step}
                                </span>
                              </div>
                              {idx < flow.steps.length - 1 && (
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MÓDULO 3: ERROS COMUNS (TROUBLESHOOTING) */}
              {activeModule === "erros" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1E3A8A]">
                        Erros Comuns — Troubleshooting
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Base viva de lições aprendidas catalogada por sintoma,
                        causa raiz e procedimento de correção.
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-1.5">
                      {[
                        "Todos",
                        "Módulo Fiscal",
                        "Módulo Financeiro",
                        "Integrações",
                      ].map((mod) => (
                        <button
                          key={mod}
                          onClick={() => setSelectedModuleFilter(mod)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            selectedModuleFilter === mod
                              ? "bg-[#1D4ED8] text-white"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {mod}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredTroubleshooting.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8]">
                            {item.module}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Wrench className="w-3.5 h-3.5" /> Procedimento
                            Validado N1/N2
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-800">
                          {item.title}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-red-50/50 border border-red-100 rounded-lg p-3.5">
                            <p className="font-semibold text-red-800 mb-1">
                              Sintoma observado
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                              {item.symptom}
                            </p>
                          </div>
                          <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3.5">
                            <p className="font-semibold text-amber-800 mb-1">
                              Causa raiz
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                              {item.rootCause}
                            </p>
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4">
                          <p className="text-xs font-semibold text-slate-800 mb-2">
                            Procedimento de correção passo a passo:
                          </p>
                          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
                            {item.solution.map((step, i) => (
                              <li key={i} className="leading-relaxed">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MÓDULO 4: FAQ — DÚVIDAS FREQUENTES */}
              {activeModule === "faq" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E3A8A]">
                      FAQ — Dúvidas Frequentes
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Respostas rápidas para regras internas e operação da
                      plataforma durante o onboarding.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {faqItems.map((faq) => {
                      const isOpen = openFaqId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs"
                        >
                          <button
                            onClick={() =>
                              setOpenFaqId(isOpen ? null : faq.id)
                            }
                            className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-slate-50/70 transition-colors"
                          >
                            <span className="text-xs font-medium text-slate-700">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/40">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
